
const userModel = require("../Models/userModel");
const {Send_VerifyCode} =require('../middleware/Email')
// =======================
// REGISTER / CREATE USER
// =======================
const create = async (req, res) => {
  const data = req.body;

  console.log("📩 Registration request received:", {
    name: data.name,
    email: data.email,
    phone: data.phone,
  });

  try {
    // Generate 5-digit OTP as a STRING — avoids nodemailer ESTREAM error
    const verifycode = String(Math.floor(10000 + Math.random() * 90000));
    const verifycodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    console.log("🔢 Verification code generated:", verifycode);

    // Save user to DB
    const user_data = await userModel.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      address: data.address,
      verifycode,
      verifycodeExpiry,
    });

    console.log("✅ User saved to MongoDB — ID:", user_data._id);

    // Send verification email
    console.log("📧 Sending verification email to:", user_data.email);
    await Send_VerifyCode(user_data.email, verifycode);
    console.log("✅ Verification email sent successfully");

    return res.status(201).send({
      message: "Account created successfully. Please check your email for the verification code.",
      flag: 0,
      data: {
        _id: user_data._id,
        name: user_data.name,
        email: user_data.email,
        isVerified: user_data.isVerified,
      },
    });

  } catch (error) {
    console.error("❌ Registration error:", error.message);

    // Duplicate email or phone
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(409).send({
        message: `This ${field} is already registered. Please login instead.`,
        flag: 1,
      });
    }

    return res.status(500).send({
      message: error.message,
      flag: 1,
    });
  }
};

// =======================
// GET ALL USERS
// =======================
const get = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.status(200).send({
      message: "Users fetched successfully",
      flag: 0,
      data: users,
    });
  } catch (error) {
    console.error("❌ Get users error:", error.message);
    return res.status(500).send({ message: error.message, flag: 1 });
  }
};

// =======================
// LOGIN
// =======================
const login = async (req, res) => {
  const data = req.body;
  try {
    const user = await userModel.findOne({ email: data.email });

    if (!user) {
      return res.status(404).send({ msg: "User does not exist", flag: 1 });
    }

    if (user.password !== data.password) {
      return res.status(401).send({ msg: "Incorrect password", flag: 1 });
    }

    return res.status(200).send({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
      msg: "User logged in successfully",
      flag: 0,
    });

  } catch (error) {
    console.error("❌ Login error:", error.message);
    return res.status(500).send({ msg: "Login error", flag: 1 });
  }
};

// =======================
// VERIFY OTP
// =======================
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found", flag: 1 });
    }

    if (user.isVerified) {
      return res.status(200).send({ message: "Account already verified", flag: 0 });
    }

    if (!user.verifycode || !user.verifycodeExpiry) {
      return res.status(400).send({ message: "No verification code found. Please register again.", flag: 1 });
    }

    if (new Date() > user.verifycodeExpiry) {
      return res.status(410).send({ message: "Verification code has expired. Please request a new one.", flag: 1 });
    }

    if (user.verifycode !== String(otp)) {
      return res.status(400).send({ message: "Invalid verification code", flag: 1 });
    }

    // Mark verified and clear OTP
    await userModel.findByIdAndUpdate(user._id, {
      isVerified: true,
      verifycode: null,
      verifycodeExpiry: null,
    });

    console.log("✅ User verified:", email);

    return res.status(200).send({
      message: "Email verified successfully! You can now log in.",
      flag: 0,
    });

  } catch (error) {
    console.error("❌ OTP verification error:", error.message);
    return res.status(500).send({ message: error.message, flag: 1 });
  }
};

// =======================
// RESEND OTP
// =======================
const resendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found", flag: 1 });
    }

    if (user.isVerified) {
      return res.status(400).send({ message: "Account already verified", flag: 1 });
    }

    const verifycode = String(Math.floor(10000 + Math.random() * 90000));
    const verifycodeExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await userModel.findByIdAndUpdate(user._id, { verifycode, verifycodeExpiry });

    await Send_VerifyCode(email, verifycode);

    console.log("✅ OTP resent to:", email);

    return res.status(200).send({
      message: "Verification code resent. Please check your email.",
      flag: 0,
    });

  } catch (error) {
    console.error("❌ Resend OTP error:", error.message);
    return res.status(500).send({ message: error.message, flag: 1 });
  }
};

// =======================
// UPDATE USER
// =======================
const update = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send({ message: "User not found", flag: 1 });
    }
    return res.status(200).send({ message: "User updated successfully", flag: 0, data: user });
  } catch (error) {
    return res.status(500).send({ message: error.message, flag: 1 });
  }
};

// =======================
// DELETE USER
// =======================
const Delete = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ message: "User not found", flag: 1 });
    }
    return res.status(200).send({ message: "User deleted successfully", flag: 0 });
  } catch (error) {
    return res.status(500).send({ message: error.message, flag: 1 });
  }
};

// =======================
// ADD ADDRESS
// =======================
const addAddress = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) return res.send({ message: "User not found", flag: 1 });
    user.addresses.push(req.body);
    await user.save();
    return res.send({ message: "Address added successfully", flag: 0, data: user.addresses });
  } catch (error) {
    return res.send({ message: error.message, flag: 1 });
  }
};

// =======================
// UPDATE ADDRESS
// =======================
const updateAddress = async (req, res) => {
  const { userId, addressId } = req.params;
  try {
    const user = await userModel.findById(userId);
    if (!user) return res.send({ message: "User not found", flag: 1 });
    const address = user.addresses.id(addressId);
    if (!address) return res.send({ message: "Address not found", flag: 1 });
    Object.assign(address, req.body);
    await user.save();
    return res.send({ message: "Address updated successfully", flag: 0, data: address });
  } catch (error) {
    return res.send({ message: error.message, flag: 1 });
  }
};

// =======================
// DELETE ADDRESS
// =======================
const deleteAddress = async (req, res) => {
  const { userId, addressId } = req.params;
  try {
    const user = await userModel.findById(userId);
    if (!user) return res.send({ message: "User not found", flag: 1 });
    const address = user.addresses.id(addressId);
    if (!address) return res.send({ message: "Address not found", flag: 1 });
    address.deleteOne();
    await user.save();
    return res.send({ message: "Address deleted successfully", flag: 0, data: user.addresses });
  } catch (error) {
    return res.send({ message: error.message, flag: 1 });
  }
};

module.exports = {
  create,
  get,
  login,
  verifyOtp,
  resendOtp,
  update,
  Delete,
  addAddress,
  updateAddress,
  deleteAddress,
};
