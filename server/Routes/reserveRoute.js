const express = require('express')
const { create, get, Delete, update } = require('../Contrllers/reservController')

const reserveRoute = express.Router()

reserveRoute.post('/create', create)
reserveRoute.get('/get', get)
reserveRoute.patch('/update/:id', update)
reserveRoute.delete('/delete/:id', Delete)

module.exports = reserveRoute
