const express=  require('express')
const dishModel = require('../Models/dishModel')


const create= async (req, res)=>{
    
    const data=req.body
    
    const same_dishName_data= await dishModel.findOne({name:data.name})
    
    
    try {
        if(data.name==""){
            res.send("Name is required", 1)
            return
        }else if(data.price===null){
            res.send('Price is required',1)
            return
        }else if(data.main===null){
            res.send('Main is required',1)
            return
        }else if(data.sub===null){
            res.send('Sub is required',1)
            return
        }else if(data.image===null){
            res.send('Image is required',1)
            return
        }
        else if(null!==same_dishName_data){
            res.send({
                msg:"This dish are already exist",
                flag:1
            })
        }
        
        
        const dish_Data= await dishModel.create(
            {
                name:data.name,
                image:data.image,
                price:data.price,
                description:data.description,
                main:data.main,
                sub:data.sub
            }
        )
        
        
        
        return res.send({
            msg:"Dish Create Sucessfully",
            flag:0
        })
        
    } catch (error) {
        console.log(error)
        return res.send('Something went worng',1)
        
    }
}

const get= async (req, res)=>{

    const data= await dishModel.find()
    res.send({
        data,
        msg:"Fetch data sucessfully",
        flag:0
    })

}

const update= async( req, res)=>{
    const data= req.body
    const {id}= req.params

    try {
         const dish_data= await dishModel.findByIdAndUpdate(id,{
name:data.name,
price:data.price,
description:data.description,
image:data.image,
main:data.main,
sub:data.sub
    })

    if(!dish_data){
        res.send('Dish not found',1)
        return
    }

    return res.send({
        msg:"dish update sucessfullu",
        flag:0
    })
    } catch (error) {
        console.log(error)
        res.send("something went wrong",1)
    }
    
   

}

const Delete= async (req, res)=> {
    const {id}=req.params

    try {
   const deletedDish= await dishModel.findByIdAndDelete(id)

    if (!deletedDish) {
            return res.send({
                msg: "Dish not found",
                flag: 1
            });
        }
    return res.send({
        msg:"Data delete sucessfully",
        flag:0
    })
    } catch (error) {
        console.log(error)
        res.send({
            msg:"Something went wrong",
            flag:1
        })
        
    }
}


module.exports={create, get,update, Delete}