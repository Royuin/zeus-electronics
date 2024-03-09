const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const graphicsCardController = require('../controllers/graphicsCardController');

router.get('/', categoryController.category_list);

router.get('/category/graphics-cards/:id', categoryController.graphics_cards_list);

router.get('/category/graphics-cards/product/:productId', graphicsCardController.graphics_card_details);

router.get('/category/memory/:id', categoryController.memory_list);

router.get('/category/motherboards/:id', categoryController.motherboard_list);

router.get('/category/processors/:id', categoryController.processor_list);

module.exports = router;
