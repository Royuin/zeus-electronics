const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.category_list);

router.get('/category/graphics-cards/:id', categoryController.graphics_cards_list);

module.exports = router;
