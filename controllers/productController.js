const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Category = require('../models/category');
const Product = require('../models/product');
const { format } = require('morgan');

exports.product_details = asyncHandler( async (req, res, next) => {
  const product = await Product.findById( req.params.id ).exec();
  const category = await Category.findById(product.category).exec();

  res.render('product_details', {
    product: product,
    category: category,
  });
});

exports.product_create_get = asyncHandler( async (req, res, next) => {
  const categories = await Category.find().exec();

  res.render('product_form', {
    title: 'Create a new product',
    categories: categories,
  });
});

exports.product_create_post = [
  body('name', 'Name must contain at least 3 characters.').trim().isLength({min: 3}).escape(),
  body('category').escape(),
  body('description', 'Description must not be empty').trim().escape(),
  body('price', 'Price must not be empty and greater than 0.').trim().isFloat({min: 1}).escape(),
  body('quantity', 'Quantity must be a whole non negative number.').trim().isInt({min: 0}).escape(),


  asyncHandler( async (req, res, next) => {
    const errors = validationResult(req);
    const categories = await Category.find().exec();

    if(!errors.isEmpty()) {
      res.render('product_form', {
        title: 'Create a new product',
        errors: errors.array(),
        name: req.body.name,
        description: req.body.description,
        category_selection: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity,
        categories: categories,
      });
      return;
    } else {
      const productExists = await Product.findOne({name: req.body.name}).exec();
      if (productExists) {
        console.log('Product already exists');
        res.render('product_form', {
          title: 'Create a new product',
          errors: errors.array(),
          name: req.body.name,
          description: req.body.description,
          category_selection: req.body.category,
          price: req.body.price,
          quantity: req.body.quantity,
          categories: categories,
        });
        return;
      }
      else {
        const category = await Category.findOne({name: req.body.category}).exec();
        const newProduct = Product({name: req.body.name, category: category, description: req.body.description, price: req.body.price, quantity: req.body.quantity});
        await newProduct.save();
        res.redirect(newProduct.url);
      }
    }
  }),
]

exports.product_update_get = asyncHandler( async (req, res, next) => {
  const product = await Product.findById(req.params.id).exec();
  const category = await Category.findById(product.category).exec();
  const categories = await Category.find().exec();

  res.render('product_form', {
    title: `Update product ${product.name}`,
    name: product.name,
    category_selection: category.name,
    description: product.description,
    price: product.price,
    quantity: product.price,
    categories: categories,
  })
});

exports.product_update_post = [ 
  body('name', 'Name must contain at least 3 characters.').trim().isLength({min: 3}).escape(),
  body('category').escape(),
  body('description', 'Description must not be empty').trim().escape(),
  body('price', 'Price must not be empty and greater than 0.').trim().isFloat({min: 1}).escape(),
  body('quantity', 'Quantity must be a whole non negative number.').trim().isInt({min: 0}).escape(),

  asyncHandler ( async (req, res, next) => {
    const errors = validationResult(req);
    const product = await Product.findById(req.params.id).exec();
    const category = await Category.findById(product.category).exec();
    const categories = await Category.find().exec();

    if(!errors.isEmpty()) { 
      res.render('product_form', {
        title: `Update product ${product.name}`,
        name: product.name,
        category_selection: category.name,
        description: product.description,
        price: product.price,
        quantity: product.price,
        categories: categories,
      })
    } else {
      const category = await Category.findOne({name: req.body.category}).exec();
      const update = {
        name: req.body.name,
        category: category,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
      };
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, update).exec();
      res.redirect(updatedProduct.url);
    }
  }),
];

exports.product_delete_get = asyncHandler( async (req, res, next) => {
  const product = await Product.findById(req.params.id).exec();
  const category = await Category.findById(product.category).exec();

  res.render('product_delete', {
    product: product,
    category: category,
  });
});

exports.product_delete_post = asyncHandler( async (req, res, next) => {
  const product = await Product.findById(req.params.id).exec();
  await product.deleteOne();

  res.redirect('/');
});
