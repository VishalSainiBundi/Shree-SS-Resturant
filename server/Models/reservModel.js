const mongoose = require("mongoose");

const tableBookingSchema = new mongoose.Schema(
  {
    // customerName: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },

    // phone: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },

    // email: {
    //   type: String,
    //   trim: true,
    //   default: "",
    // },

    tableNo: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Royal Dining", "Business Dining", "Classic Dining"],
    },

    guests: {
      type: Number,
    //   required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
    capecity: {
      type: Number,
      required: true,
      
    },

    // bookingDate: {
    //   type: Date,
    //   required: true,
    // },

    // bookingTime: {
    //   type: String,
    //   required: true,
    // },

    // paymentStatus: {
    //   type: String,
    //   enum: ["Case", "Card", "Online"],
    //   default: "Pending",
    // },
    status: {
      type: Boolean,
      default:true
    },

    // bookingStatus: {
    //   type: String,
    //   enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
    //   default: "",
    // },
  },
  {
    timestamps: true,
  }
);

const reserveModel = mongoose.model("TableBooking", tableBookingSchema);
module.exports = reserveModel