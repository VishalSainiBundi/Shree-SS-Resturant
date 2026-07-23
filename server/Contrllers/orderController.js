// const { model } = require("mongoose")
// const OrderModel = require("../Models/orderModel")
// const { default: message } = require("../../message")

// const create=async (req, res)=>{
//     const data= req.body
//     try {
        
// const orderDaat= await OrderModel.create({
//     name:data.name,
//     price:data.price,
//     totalprice:data.totalprice,
//     image:data.image,
//     sub:data.sub,
//     qty:data.qty,
//     total:data.total,
//     deliveryCharge:data.deliveryCharge

// })
// return res.send(
//     {
//         msg:"Order create sucessfully",
//         flag:0
//     }
// )

//     } catch (error) {
//         console.log(error)
//         return res.send({
//             msg:"Fail to order place"
//         })
        
//     }
// }

// const get=async (req, res)=>{
//     try{
//     const order= await OrderModel.find()
//     return res.send({
//         msg:'sucessful',
//         flag:0,
//         order
//     })
// }
// catch (error){
// console.log(error)
// return res.send('error',1)
// }
// }

// const Delete= async(req, res)=>{
//     const {id} =req.params
//     try {
//         await OrderModel.findByIdAndDelete(id)
//         return res.send(message.delete)
//     } catch (error) {
//         console.log(error)
//         return res.send(message.error)
        
//     }
// }

// module.exports={create, get, Delete}





const OrderModel = require("../Models/orderModel");

const create = async (req, res) => {
  try {
    const data = req.body;

    console.log("📥 Order Data:", data);

    const missingFields = ["name", "price", "qty", "sub", "image"].filter(
      (f) => !data[f] && data[f] !== 0
    );
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const qty = Number(data.qty);
    const price = Number(data.price);
    const deliveryCharge = Number(data.deliveryCharge ?? 50);

    // Total must include delivery charge — this is what the frontend displays
    const total = price * qty + deliveryCharge;

    console.log(`💰 price=${price} × qty=${qty} + delivery=${deliveryCharge} = total=${total}`);

    const order = await OrderModel.create({
      name: data.name,
      price,
      qty,
      total,
      deliveryCharge,
      sub: data.sub,
      image: data.image,
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      flag:0,
      data: order,
    });
  } catch (error) {
    console.log("❌ Order Create Error:", error.name, error.message);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: `Validation failed: ${Object.values(error.errors)
          .map((e) => e.message)
          .join(", ")}`,
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const get = async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    console.log("❌ Get Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const Delete = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await OrderModel.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.log("❌ Delete Order Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  create,
  get,
  Delete,
};