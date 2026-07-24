const { get } = require("mongoose")
const reserveTableModel = require("../Models/reserveTableModel")
const reserveModel = require("../Models/reservModel")

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
    try {
        const reserdata= await reserveTableModel.find()
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

const status= async (req, res)=>{
    try {
    const tableData= await reserveModel.find()
    return res.send({
        tableData,
        msg:"table data"
    }
    )
    } catch (error) {
        console.log(error)
        return res.send({
            msg:"Internal error",
            flag:1
        })
    }
}

module.exports = {bookTable, getBook, status}