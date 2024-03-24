const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');

router.get('/', categoryController.category_list);

router.get('/category/create', categoryController.category_create_get);
router.post('/category/create', categoryController.category_create_post);

router.get('/category/:hypenName/:id', categoryController.category_products);

router.get('/product/create', productController.product_create_get);
router.post('/product/create', productController.product_create_post);

module.exports = router;
