// const mongoose= require('mongoose')

// const orderScema= mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     price:{
//         type:Number,
//         required:true
//     },
//      totalprice:{
//         type:Number,
//         required:true
//     },

// total:{
//         type:Number,
//         required:true
//     },  
    
//     deliveryCharge:{
//         type:Number,
//         required:true,
//         default:50
//     },
//      qty:{
//         type:String,
//         required:true,
//         default:1
//     },
//     sub:{
//         type:String,
//         required:true
//     },
//     image:{
        
//         type:String,
//         required:true
//     }
// })

// const OrderModel= mongoose.model('order',orderScema)
// module.exports = OrderModel




const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    qty: {
      type: Number,
      required: true,
      default: 1,
    },

    total: {
      type: Number,
      required: true,
    },

    deliveryCharge: {
      type: Number,
      default: 50,
    },

    sub: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);