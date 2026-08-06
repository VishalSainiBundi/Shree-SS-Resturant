const reserveTableModel = require("../Models/reserveTableModel")
const reserveModel      = require("../Models/reservModel")
const { Send_booking, Send_booking_cancel }  = require("../middleware/Email")

// ─────────────────────────────────────────────
// POST /reserve/create
// ─────────────────────────────────────────────
// const bookTable = async (req, res) => {
//   const data = req.body

//   console.log("📥 Booking request received:", JSON.stringify(data, null, 2))
//   console.log("📧 Customer email:", data.email)
//   console.log("📅 bookingDate:", data.bookingDate)
//   console.log("⏰ bookingTime:", data.bookingTime)

//   try {
//     // 1. Save to MongoDB — pre("save") hook sets expiresAt
//     const bookData = await reserveTableModel.create({
//       customerName: data.customerName,
//       phone:        data.phone,
//       email:        data.email,
//       tableNo:      data.tableNo,
//       price:        data.price,
//       capecity:     data.capecity,
//       bookingDate:  data.bookingDate,
//       bookingTime:  data.bookingTime,
//       category:     data.category,
//     })

//     console.log("✅ Booking saved to DB — ID:", bookData._id)
//     console.log("📧 Email on saved doc:", bookData.email)
//     console.log("🕐 expiresAt:", bookData.expiresAt)

//     // 2. Send confirmation email
//     if (!bookData.email) {
//       console.warn("⚠️  bookData.email is empty — email field was not sent from the frontend. Skipping email.")
//     } else {
//       console.log("📨 Calling Send_booking for:", bookData.email)
//       await Send_booking(bookData)
//       console.log("✅ Booking confirmation email sent to:", bookData.email)
//     }

//     // 3. Respond — only after both DB save and email succeed
//     return res.send({
//       bookData,
//       msg: "Reserve your table successfully",
//       flag: 0,
//     })

//   } catch (error) {
//     console.error("❌ bookTable error:", error.message)
//     console.error(error)
//     return res.send({
//       msg: "Internal error",
//       flag: 1,
//     })
//   }
// }

const bookTable = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      email,
      tableNo,
      price,
      capecity,
      bookingDate,
      bookingTime,
      category,
      specialRequest,
    } = req.body;

    console.log("📥 Booking Request:", req.body);

    // Save booking
    const bookData = await reserveTableModel.create({
      customerName,
      phone,
      email,
      tableNo,
      price,
      capecity,
      bookingDate,
      bookingTime,
      category,
      specialRequest,
    });

    console.log("✅ Booking Saved:", bookData._id);

    // Send email (don't fail booking if email fails)
    if (bookData.email) {
      try {
        await Send_booking(bookData);
        console.log("✅ Booking email sent:", bookData.email);
      } catch (mailError) {
        console.error("❌ Email Error:", mailError);
      }
    }

    return res.status(200).send({
      flag: 0,
      msg: "Reserve your table successfully",
      bookData,
    });
  } catch (error) {
    console.error("❌ Booking Error:", error);

    return res.status(500).send({
      flag: 1,
      msg: error.message || "Internal Server Error",
    });
  }
};

// ─────────────────────────────────────────────
// GET /reserve/get
// ─────────────────────────────────────────────
const getBook = async (req, res) => {
  try {
    const reserdata = await reserveTableModel.find()
    return res.send({
      reserdata,
      msg: "Success data",
      flag: 0,
    })
  } catch (error) {
    console.error("❌ getBook error:", error.message)
    return res.send({
      msg: "Internal error",
      flag: 1,
    })
  }
}

// ─────────────────────────────────────────────
// PATCH /reserve/status  — sync table availability
// ─────────────────────────────────────────────
const status = async (req, res) => {
  try {
    const tableData  = await reserveModel.find()
    const reservData = await reserveTableModel.find()

    for (const table of tableData) {
      const isReserved = reservData.some(r => r.tableNo === table.tableNo)
      await reserveModel.updateOne(
        { _id: table._id },
        { $set: { status: !isReserved } }
      )
    }

    const updatedTables = await reserveModel.find()
    return res.send({ data: updatedTables, msg: "Table status updated" })

  } catch (error) {
    console.error("❌ status error:", error.message)
    return res.send({ msg: "Internal error", flag: 1 })
  }
}

// ─────────────────────────────────────────────
// DELETE /reserve/delete/:id
// ─────────────────────────────────────────────
const Delete = async (req, res) => {
  const { id } = req.params
  try {
    const  bookData= await reserveTableModel.findByIdAndDelete(id)
    await Send_booking_cancel(bookData)

    return res.send({ msg: "Cancellation Successful", flag: 0 })
  } catch (error) {
    console.error("❌ Delete error:", error.message)
    return res.send({ msg: "Internal error", flag: 1 })
  }
}

module.exports = { bookTable, getBook, status, Delete }
