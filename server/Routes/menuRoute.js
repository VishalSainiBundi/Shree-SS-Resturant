const express= require('express')
const { create, get, Delete } = require('../Contrllers/menuController')

const menuRoute= express.Router()

menuRoute.post('/create',create)
menuRoute.get('/get',get)
menuRoute.delete('/delete/:id',Delete)

module.exports= menuRoute
