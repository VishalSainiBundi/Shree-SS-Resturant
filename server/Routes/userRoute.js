const express = require("express");
const { create, get, update, Delete, addAddress, updateAddress, deleteAddress } = require("../Contrllers/userController");
const userRouter = express.Router();



// ==============================
// USER ROUTES
// ==============================

// Create User
userRouter.post("/create", create);

// Get All Users
userRouter.get("/get", get);

// Update User
userRouter.put("/update/:id", update);

// Delete User
userRouter.delete("/delete/:id", Delete);

// ==============================
// ADDRESS ROUTES
// ==============================

// Add Address
userRouter.post("/address/add/:id", addAddress);

// Update Address
userRouter.put("/address/update/:userId/:addressId", updateAddress);

// Delete Address
userRouter.delete("/address/delete/:userId/:addressId", deleteAddress);

module.exports = userRouter;