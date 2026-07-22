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

total:{
        type:Number,
        required:true
    },  
    
    delivryCharge:{
        type:Number,
        required:true,
        default:50
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