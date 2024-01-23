const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.category_list);

router.get('/category/graphics-cards/:id', categoryController.graphics_cards_list);

router.get('/category/memory/:id', categoryController.memory_list);

router.get('/category/motherboards/:id', categoryController.motherboard_list);

router.get('/category/processors/:id', categoryController.processor_list);

module.exports = router;
