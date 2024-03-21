const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const graphicsCardController = require('../controllers/graphicsCardController');
const memoryController = require('../controllers/memoryController');
const motherboardController = require('../controllers/motherboardController');
const processorController = require('../controllers/processorController');
const productController = require('../controllers/productController');

router.get('/', categoryController.category_list);

router.get('/category/create', categoryController.category_create_get);
router.post('/category/create', categoryController.category_create_post);

router.get('/category/graphics-cards/:id', categoryController.graphics_cards_list);
router.get('/category/graphics-cards/product/:productId', graphicsCardController.graphics_card_details);

router.get('/category/memory/:id', categoryController.memory_list);
router.get('/category/memory/product/:productId', memoryController.memory_product_details);

router.get('/category/motherboards/:id', categoryController.motherboard_list);
router.get('/category/motherboards/product/:productId', motherboardController.motherboard_details);

router.get('/category/processors/:id', categoryController.processor_list);
router.get('/category/processors/product/:productId', processorController.processor_details);

router.get('/product/create', productController.product_create_get);
router.post('/product/create', productController.product_create_post);

module.exports = router;
