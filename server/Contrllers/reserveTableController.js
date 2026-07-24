const { get } = require("mongoose")
const reserveTableModel = require("../Models/reserveTableModel")

const bookTable= async (req, res)=>{
    const data= req.body
    try {
        
const bookData= await reserveTableModel.create({
    customerName:data.customerName,
    phone:data.phone,
    email:data.email,
    tableNo:data.tableNo,
    price:data.price,
    capecity:data.capecity,
    bookingDate:data.bookingDate,
    bookingTime:data.bookingTime,
    category:data.category
})

return res.send({
    bookData,
    msg:"Reserve your table sucessfully",
    flag:0
})


    } catch (error) {
        console.log(error)
        return res.send({
            msg:'internal error ',
            flag:1
        })
    }
}

const getBook = async (req, res)=>{
    const {id} = req.params
    try {
        const reserdata= await reserveTableModel.findById(id)
        return res.send({
            reserdata,
            msg:"Sucess data",
            flag:0
        })
    } catch (error) {
        console.log(error)
        return res.send({
            msg:'Internal error',
            flag:1
        })
    }
}

module.exports = {bookTable, getBook}