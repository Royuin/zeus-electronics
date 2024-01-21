const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', function(req, res, next) {
  res.render('index', {title: 'All Categories'});
});

router.get('/categories', categoryController.category_list); 

module.exports = router;
