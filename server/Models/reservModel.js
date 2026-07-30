const mongoose = require("mongoose");

// This model represents a TABLE DEFINITION (not a booking).
// It stores the restaurant's table inventory — tableNo, category, capacity, price, status.
// Bookings are stored in reserveTableModel.js (ReserveTableBooking collection).
const tableSchema = new mongoose.Schema(
  {
    tableNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Royal Dining", "Business Dining", "Classic Dining"],
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    capecity: {
      type: Number,
      required: true,
      min: 1,
    },

    // true = available, false = booked
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const reserveModel = mongoose.model("TableBooking", tableSchema);
module.exports = reserveModel;
