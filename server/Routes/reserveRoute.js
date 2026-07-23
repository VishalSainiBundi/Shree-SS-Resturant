const express= require('express')
const { create, get } = require('../Contrllers/reservController')

const reserveRoute= express.Router()

reserveRoute.post('/create',create)
reserveRoute.get('/get',get)

module.exports = reserveRoute