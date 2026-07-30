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



const Delete = async (req, res) => {
  const { id } = req.params
  try {
    const table = await reserveModel.findByIdAndDelete(id)
    if (!table) {
      return res.send({ msg: "Table not found", flag: 1 })
    }
    return res.send({ msg: "Table deleted successfully", flag: 0 })
  } catch (error) {
    console.error("❌ Delete table error:", error.message)
    return res.send({ msg: "Internal error", flag: 1 })
  }
}

const update = async (req, res) => {
  const { id } = req.params
  try {
    const table = await reserveModel.findByIdAndUpdate(id, req.body, { new: true })
    if (!table) {
      return res.send({ msg: "Table not found", flag: 1 })
    }
    return res.send({ msg: "Table updated successfully", flag: 0, data: table })
  } catch (error) {
    console.error("❌ Update table error:", error.message)
    return res.send({ msg: "Internal error", flag: 1 })
  }
}

module.exports = { create, get, Delete, update }

