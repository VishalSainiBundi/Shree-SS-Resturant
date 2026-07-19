const menuModel = require("../Models/menuModel")

const create= async (req, res)=>{
    const data = req.body

    try {

        const menu= await menuModel.create(
            {
                main:data.main,
                sub:data.sub
            }
        )
        return res.send('menu create sucessfully', 0)
    } catch (error) {
        console.log(error)
        return res.send('Something went wrong',1)
    }
}

const get= async( req, res)=>{

    try {
    const menu= await menuModel.find()
        
    return res.send({
        msg:"sucessful",
        flag:0,
        menu
    })
    } catch (error) {
        console.log(error)
        return res.send('something went wrong',1)
        
    }
    
}


const Delete= async(req, res)=>{
    const {id}= req.params

    try {
        await menuModel.findByIdAndDelete(id)
        return res.send('data deleete ',0)
    } catch (error) {
        console.log(error )
        return res.send('something went wrong',1)
    }
}

module.exports= {create, get, Delete}