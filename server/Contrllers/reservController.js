const reserveModel = require("../Models/reservModel")

const create= async (req, res)=>{
    const data= req.body
    try {

        const table= await reserveModel.create({
            tableNo:data.tableNo,
            category:data.category,
            price:data.price,
            capecity:data.capecity,
        })
        return res.send({
            msg:"Table Add Sucessfully",
            flag:0
        })
        
    } catch (error) {
        console.log(error)
        return res.send({
            msg:"Internal error",
            flag:1
        })
    }
}

const get=  async(req, res)=>{
try {
    const data= await reserveModel.find()
    return res.send({
        data,
        msg:"Sucess",
        flag:0
    })
} catch (error) {
    console.log(error)
    return res.send({
        msg:"internal error ",
        flag:1
    })
}
}



module.exports= {create, get}

