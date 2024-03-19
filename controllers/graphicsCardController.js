const GraphicsCard = require('../models/graphicsCard')
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.graphics_card_details = asyncHandler( async (req, res, next) => {
  const graphicsCard = await  GraphicsCard.findById(req.params.productId).exec();

  res.render('graphics_card_details', {
    title: graphicsCard.name,
    graphicsCard: graphicsCard,
  });
});

exports.graphics_card_create_get = asyncHandler( async (req, res, next) => {
  res.render('graphics_card_form', {
    title: 'Create a new graphics Card',
  });
});

exports.graphics_card_create_post = [
  body('name', 'Name must contain at least 3 characters.').trim().isLength({min: 3}).escape(),
  body('description').trim().escape(),
  body('price', 'Price must not be empty and greater than 0.').trim().isFloat({min: 1}).escape(),
  body('quantity', 'Quantity must be empty and a whole non negative number.').trim().isInt({min: 0}).escape(),

  asyncHandler( async (req, res, next) => {
    const errors = validationResult(req);
    const graphicsCard = new GraphicsCard({name: req.body.name, description: req.body.description, price: req.body.price, quantity: req.body.quantity});

    if(!errors.isEmpty()) {
      res.render('graphics_card_form', {
        title: 'Create a new graphics card',
        errors: errors.array(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
      });
      return;
    }  
  }),
]
