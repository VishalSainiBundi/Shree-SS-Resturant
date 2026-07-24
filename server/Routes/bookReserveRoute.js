const express= require('express')
const { bookTable, getBook, status } = require('../Contrllers/reserveTableController')

const bookReserveRoute= express.Router()

bookReserveRoute.post('/create',bookTable)
bookReserveRoute.get('/get',getBook)
bookReserveRoute.patch('/status',status)

module.exports = bookReserveRoute