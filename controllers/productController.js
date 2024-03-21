const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Category = require('../models/category');

exports.product_create_get = asyncHandler( async (req, res, next) => {
  const categories = await Category.find().exec();

  res.render('product_form', {
    title: 'Create a new product',
    categories: categories,
  });
});

exports.product_create_post = [
  body('name', 'Name must contain at least 3 characters.').trim().isLength({min: 3}).escape(),
  body('description').trim().escape(),
  body('price', 'Price must not be empty and greater than 0.').trim().isFloat({min: 1}).escape(),
  body('quantity', 'Quantity must be empty and a whole non negative number.').trim().isInt({min: 0}).escape(),

  asyncHandler( async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      res.render('product_form', {
        title: 'Create a new product',
        errors: errors.array(),
        previous_name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
      });
      return;
    }  
  }),
]
