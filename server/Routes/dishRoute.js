const express=require('express')
const { create, get, Delete, update } = require('../Contrllers/dishController')

const dishRouter= express.Router()

dishRouter.post('/create',create)
dishRouter.get('/get',get)
dishRouter.patch('/update/:id',update)
dishRouter.delete('/delete/:id',Delete)

module.exports = dishRouter