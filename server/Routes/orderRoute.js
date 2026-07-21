const express= require('express')
const { create, get, Delete } = require('../Contrllers/orderController')

const OrderRoute= express.Router()

OrderRoute.post('/create',create)
OrderRoute.get('/get',get)
OrderRoute.delete('/delete/:id',Delete)

module.exports= OrderRoute