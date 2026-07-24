const express= require('express')
const { bookTable, getBook } = require('../Contrllers/reserveTableController')

const bookReserveRoute= express.Router()

bookReserveRoute.post('/create',bookTable)
bookReserveRoute.get('/get/:id',getBook)

module.exports = bookReserveRoute