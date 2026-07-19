const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    main: {
      type: String,
      required: true,
      trim: true,
    },

    sub: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const menuModel= mongoose.model("menu", menuSchema);
export default menuModel