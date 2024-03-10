const Memory = require('../models/memory');
const asyncHandler = require('express-async-handler');

exports.memory_product_details = asyncHandler( async (req, res, next) => {
  const memoryProduct = await Memory.findById(req.params.productId).exec();

  res.render('memory_product_details', {
    title: memoryProduct.name,
    product: memoryProduct,
  });
});

