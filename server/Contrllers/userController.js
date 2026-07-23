const userModel = require("../Models/userModel")

const create = async (req, res) => {
  const data = req.body;
const verifycode = Math.floor(10000 + Math.random() * 90000);


  try {
    const user_data = await userModel.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      // role: data.role,
      address: data.address,
      verifycode:verifycode
    });

    res.status(201).send({
      message: "User created successfully",
      flag: 1,
      data: user_data,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      flag: 0,
    });
  }
};


const get = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).send({
      message: "Users fetched successfully",
      flag: 1,
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      flag: 0,
    });
  }
};


const login=async (req, res)=>{
  const data = req.body
  try {
    
const user= await userModel.findOne({email:data.email})

if(!user) {
  res.send({
    msg:'user not exist ',
    flag:1
  })
}

if(user.email !==data.email){
  return res.send({
    msg:"Email are invailied",
    flag:1
  })
}

else if (user.password !=data.password){
  return res.send({
    msg:"Password not match",
    flag:1
  })
}

return res.send(
  {
    user,
    msg:"User login sucessfully",
    flag:0
  }
)

  } catch (error) {
    console.log(error)
return res.send(
  {
    msg:"Login error",
    flag:1
  }
)    
  }
}

// const logout=(req, res)=>{

// }

// =======================
// UPDATE USER
// =======================
const update = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,          // return updated document
        runValidators: true // validate schema
      }
    );

    if (!user) {
      return res.status(404).send({
        message: "User not found",
        flag: 0,
      });
    }

    res.status(200).send({
      message: "User updated successfully",
      flag: 1,
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      flag: 0,
    });
  }
};

// =======================
// DELETE USER
// ======================
const Delete = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send({
        message: "User not found",
        flag: 0,
      });
    }

    res.status(200).send({
      message: "User deleted successfully",
      flag: 1,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      flag: 0,
    });
  }
};

const addAddress = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id);

    if (!user) {
      return res.send({
        message: "User not found",
        flag: 0,
      });
    }

    user.addresses.push(req.body);

    await user.save();

    res.send({
      message: "Address added successfully",
      flag: 1,
      data: user.addresses,
    });
  } catch (error) {
    res.send({
      message: error.message,
      flag: 0,
    });
  }
};


const updateAddress = async (req, res) => {
  const { userId, addressId } = req.params;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.send({
        message: "User not found",
        flag: 0,
      });
    }

    const address = user.addresses.id(addressId);

    if (!address) {
      return res.send({
        message: "Address not found",
        flag: 0,
      });
    }

    Object.assign(address, req.body);

    await user.save();

    res.send({
      message: "Address updated successfully",
      flag: 1,
      data: address,
    });
  } catch (error) {
    res.send({
      message: error.message,
      flag: 0,
    });
  }
};


const deleteAddress = async (req, res) => {
  const { userId, addressId } = req.params;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.send({
        message: "User not found",
        flag: 0,
      });
    }

    const address = user.addresses.id(addressId);

    if (!address) {
      return res.send({
        message: "Address not found",
        flag: 0,
      });
    }

    address.deleteOne(); // or address.remove() in older Mongoose versions

    await user.save();

    res.send({
      message: "Address deleted successfully",
      flag: 1,
      data: user.addresses,
    });
  } catch (error) {
    res.send({
      message: error.message,
      flag: 0,
    });
  }
};


module.exports= {create, get, update, Delete, addAddress, updateAddress, deleteAddress, login}