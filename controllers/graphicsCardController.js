const GraphicsCard = require('../models/graphicsCard')
const asyncHandler = require('express-async-handler');

exports.graphics_card_details = asyncHandler( async (req, res, next) => {
  const graphicsCard = await  GraphicsCard.findById(req.params.productId).exec();

  res.render('graphics_card_details', {
    title: graphicsCard.name,
    graphicsCard: graphicsCard,
  });
});
