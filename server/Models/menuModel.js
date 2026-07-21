// const mongoose = require("mongoose");

// const menuSchema = new mongoose.Schema(
//   {
//     image: {
//       type: String,
//       required: true,
      
//     },

//     sub: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     main: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     status: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const menuModel= mongoose.model("menu", menuSchema);
// module.exports = menuModel




const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },

    public_id: {
      type: String,
      required: true,
    },

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

module.exports = mongoose.model("menu", menuSchema);