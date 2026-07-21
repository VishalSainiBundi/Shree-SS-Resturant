const mongoose= require('mongoose')

const orderScema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    qty:{
        type:String,
        required:true,
        default:1
    },
    sub:{
        type:String,
        required:true
    },
    image:{
        
        type:String,
        required:true
    }
})

const OrderModel= mongoose.model('order',orderScema)
module.exports = OrderModel