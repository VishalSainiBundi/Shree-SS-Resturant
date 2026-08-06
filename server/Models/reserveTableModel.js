const mongoose = require("mongoose");

const reservetableSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      unique:true,
      default: "",
    },

    tableNo: {
      type: String,
      required: true,
      unique:true,
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
    specialRequest:{
      type:String
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    bookingTime: {
      type: String,
      required: true,
      unique:true,
    },

    // paymentStatus: {
    //   type: String,
    //   enum: ["Case", "Card", "Online"],
    //   default: "Pending",
    // },
    status: {
      type: Boolean,
      default: true,
    },

    // bookingStatus: {
    //   type: String,
    //   enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
    //   default: "",
    // },

    // TTL field — set by pre("save") hook, used by MongoDB TTL index
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);


// 🔥 Pre-save Hook — handles both "14:30" (HTML time input) and "02:30 PM" (Postman/12-hour)
reservetableSchema.pre("save", async function () {
  const bookingDateTime = new Date(this.bookingDate);
  const timeStr = this.bookingTime.trim();

  let hours, minutes;

  if (timeStr.includes(" ")) {
    // 12-hour format: "02:30 PM" (Postman / manual input)
    const [time, meridiem] = timeStr.split(" ");
    [hours, minutes] = time.split(":").map(Number);
    if (meridiem.toUpperCase() === "PM" && hours !== 12) hours += 12;
    if (meridiem.toUpperCase() === "AM" && hours === 12) hours = 0;
  } else {
    // 24-hour format: "14:30" (HTML <input type="time">)
    [hours, minutes] = timeStr.split(":").map(Number);
  }

  bookingDateTime.setHours(hours, minutes, 0, 0);

  this.expiresAt = new Date(bookingDateTime.getTime() +2 * 60*  60 * 1000);

  console.log("✅ expiresAt calculated:", this.expiresAt)
});

// 🗑️ TTL Index
reservetableSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const reserveTableModel = mongoose.model("ReserveTableBooking", reservetableSchema);
module.exports = reserveTableModel;