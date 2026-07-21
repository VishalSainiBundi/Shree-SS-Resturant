const express= require('express')
const { create, get, Delete } = require('../Contrllers/menuController')
const uploadCategoryImage = require('../middleware/upload')

const menuRoute= express.Router()

menuRoute.post('/create', uploadCategoryImage.single('image'), create)
menuRoute.get('/get',get)
menuRoute.delete('/delete/:id',Delete)

module.exports= menuRoute




// const express = require('express');
// const router = express.Router();
// const {
//   createCategory,
//   getCategories,
//   getCategoryById,
//   updateCategory,
//   deleteCategory
// } = require('../controllers/menuController');

// // Public routes
// router.get('/all', getCategories);
// router.get('/:id', getCategoryById);

// // Create, update, delete routes
// router.post('/create', createCategory);
// router.put('/:id', updateCategory);
// router.delete('/:id', deleteCategory);

// module.exports = router;