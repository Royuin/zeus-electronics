const motherboard = require('../models/motherboard');
const Motherboard = require('../models/motherboard');
const asyncHandler = require('express-async-handler');

exports.motherboard_details = asyncHandler( async (req, res, next) => {
  const motherboard = await Motherboard.findById(req.params.productId).exec();

  res.render('motherboard_details', {
    title: motherboard.name,
    product: motherboard,
  })
})
