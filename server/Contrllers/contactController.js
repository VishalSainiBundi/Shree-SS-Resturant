const contactModel = require("../Models/contactModel")

const create= async(req, res)=>{
    const data = req.body

try {
      const contact=  contactModel.create({
        fullName:data.fullName,
        email:data.email,
        subject:data.subject,
        phone:data.phone,
        message:data.message
    })


    return res.send({
        msg:'Contact Send sucessfully',
        flag:0
    })

} catch (error) {
    console.log(error)
    return res.send({
        msg:"Internal error ",
        flag:1
    })
}

}

const get= async(req, res)=>{
    try {
  const data =  await contactModel.find()
        return res.send(
            {
                data,
                msg:'Contact get sucessfully',
                flag:0
            }
        )
    } catch (error) {
        console.log(error)
    return res.send({
        msg:"Internal error ",
        flag:1
    })
    }
}

const Delete = async (req, res)=>{

const {id} = req.params
try {
    await contactModel.findByIdAndDelete(id)
    return res.send({
        msg:'Message delete sucessfully',
        flag:0
    })
} catch (error) {
     console.log(error)
    return res.send({
        msg:"Internal error ",
        flag:1
    })
}
}

module.exports = {create, get, Delete}