const express = require("express");
const {
  create, get, update, Delete,
  addAddress, updateAddress, deleteAddress,
  login, verifyOtp, resendOtp
} = require("../Contrllers/userController");

const userRouter = express.Router();

// ==============================
// USER ROUTES
// ==============================
userRouter.post("/create",       create);
userRouter.post("/login",        login);
userRouter.post("/verify-otp",   verifyOtp);
userRouter.post("/resend-otp",   resendOtp);
userRouter.get("/get",           get);
userRouter.put("/update/:id",    update);
userRouter.delete("/delete/:id", Delete);

// ==============================
// ADDRESS ROUTES
// ==============================
userRouter.post("/address/add/:id",                      addAddress);
userRouter.put("/address/update/:userId/:addressId",     updateAddress);
userRouter.delete("/address/delete/:userId/:addressId",  deleteAddress);

module.exports = userRouter;