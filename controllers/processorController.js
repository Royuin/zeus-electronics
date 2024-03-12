const Processor = require('../models/processor');
const asyncHandler = require('express-async-handler');

exports.processor_details = asyncHandler( async (req, res, next) => {
  const processorProduct = await Processor.findById(req.params.productId).exec();

  res.render('processor_details', {
    title: processorProduct.name,
    product: processorProduct,
  });
});
