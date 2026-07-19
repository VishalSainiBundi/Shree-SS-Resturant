const mongoose=require('mongoose')

const dishSchema= mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true
    
        },
        description:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true
        },
        rating:{
            type:Number,
        },
        image:{
            type:String,
            required:true,
        unique:true
        },
        main:{
            type:String,
            required:true
        },
        sub:{
            type:String,
            required:true
        },
        feature:{
            type:Boolean,
            default:false
        }

    },{
    timestramp:true

    }
)

const dishModel=mongoose.model('dish',dishSchema)
module.exports=dishModel