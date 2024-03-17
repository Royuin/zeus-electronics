const GraphicsCard = require('../models/graphicsCard')
const asyncHandler = require('express-async-handler');

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
