const { model } = require("mongoose")
const OrderModel = require("../Models/orderModel")
const { default: message } = require("../../message")

const create=async (req, res)=>{
    const data= req.body
    try {
        
const orderDaat= await OrderModel.create({
    name:data.name,
    price:data.price,
    image:data.image,
    sub:data.sub,
    qty:data.qty,
    total:total,
    delivryCharge:delivryCharge

})
return res.send(
    {
        msg:"Order create sucessfully",
        flag:0
    }
)

    } catch (error) {
        console.log(error)
        return res.send("error",1)
        
    }
}

const get=async (req, res)=>{
    try{
    const order= await OrderModel.find()
    return res.send({
        msg:'sucessful',
        flag:0,
        order
    })
}
catch (error){
console.log(error)
return res.send('error',1)
}
}

const Delete= async(req, res)=>{
    const {id} =req.params
    try {
        await OrderModel.findByIdAndDelete(id)
        return res.send(message.delete)
    } catch (error) {
        console.log(error)
        return res.send(message.error)
        
    }
}

module.exports={create, get, Delete}