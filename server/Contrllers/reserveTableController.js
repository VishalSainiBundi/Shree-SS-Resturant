const { get } = require("mongoose")
const reserveTableModel = require("../Models/reserveTableModel")
const reserveModel = require("../Models/reservModel")
const { Send_booking } = require("../middleware/Email")


const bookTable= async (req, res)=>{
    const data= req.body

    console.log("📥 Booking request received:", JSON.stringify(data, null, 2))
    console.log("📧 Customer email:", data.email)
    console.log("📅 bookingDate:", data.bookingDate)
    console.log("⏰ bookingTime:", data.bookingTime)

    try {

        const bookData = await reserveTableModel.create({
            customerName: data.customerName,
            phone:        data.phone,
            email:        data.email,
            tableNo:      data.tableNo,
            price:        data.price,
            capecity:     data.capecity,
            bookingDate:  data.bookingDate,
            bookingTime:  data.bookingTime,
            category:     data.category
        })

        console.log("✅ Booking saved to DB — ID:", bookData._id)
        console.log("📧 Email field in saved doc:", bookData.email)

        if (!bookData.email) {
            console.error("❌ bookData.email is missing — email was not saved. Check the request payload.")
        } else {
            console.log("📨 Calling Send_booking for:", bookData.email)
            await Send_booking(bookData)
            console.log("✅ Booking confirmation email sent to:", bookData.email)
        }

        return res.send({
            bookData,
            msg: "Reserve your table sucessfully",
            flag: 0
        })

    } catch (error) {
        console.error("❌ bookTable error:", error.message)
        console.error(error)
        return res.send({
            msg: 'internal error',
            flag: 1
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

const status = async (req, res) => {
  try {
    const tableData = await reserveModel.find();
    const reservData = await reserveTableModel.find();

    for (const table of tableData) {
      const isReserved = reservData.some(
        reserve => reserve.tableNo === table.tableNo
      );

      await reserveModel.updateOne(
        { _id: table._id },
        {
          $set: {
            status: !isReserved
          }
        }
      );
    }

    const updatedTables = await reserveModel.find();

    return res.send({
      data: updatedTables,
      msg: "Table status updated"
    });

  } catch (error) {
    console.log(error);

    return res.send({
      msg: "Internal error",
      flag: 1
    });
  }
};

const Delete = async (req, res) =>{
const {id} = req.params
try {
  
await reserveTableModel.findByIdAndDelete(id)
return res.send({
  msg:'Cancilation Sucessfully',
  flag:0
})

} catch (error) {
  console.log(error)
  return res.send({
    msg:'Internal error',
  flag:1}
)
}
}

module.exports = {bookTable, getBook, status, Delete}