const express= require('express')
const { bookTable, getBook, status, Delete } = require('../Contrllers/reserveTableController')

const bookReserveRoute= express.Router()

bookReserveRoute.post('/create',bookTable)
bookReserveRoute.get('/get',getBook)
bookReserveRoute.patch('/status',status)
bookReserveRoute.delete('/delete/:id',Delete)

module.exports = bookReserveRoute