const Category = require('../models/category');
const GraphicsCard = require('../models/graphicsCard');
const Memory = require('../models/memory');
const Motherboard = require('../models/motherboard');
const Processor = require('../models/processor');

const asyncHandler = require('express-async-handler');

exports.category_create_get =  (req, res, next) => {
  res.render('category_form', {
    title: 'Create New Category',
  })
}

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();
  res.render('category_list', {
    title: 'All Categories',
    category_list: allCategories,
  });
})

exports.graphics_cards_list = asyncHandler( async (req, res, next) => {
  const allGraphicsCards = await GraphicsCard.find().sort({ name: 1 }).exec();
  res.render('graphics_cards_list', {
    title: 'Graphics Cards',
    graphics_cards_list: allGraphicsCards,
  })
})

exports.memory_list = asyncHandler( async (req, res, next) => {
  const allMemoryProducts = await Memory.find().sort({ name: 1 }).exec();
  res.render('memory_list', {
    title: 'Computer Memory',
    memory_products: allMemoryProducts,
  })
})

exports.motherboard_list = asyncHandler( async (req, res, next) => {
  const allMotherboards = await Motherboard.find().sort({ name: 1 }).exec();
  res.render('motherboards_list', {
    title: 'Motherbaords',
    motherboards_list: allMotherboards,
  })
})

exports.processor_list = asyncHandler( async (req, res, next) => {
  const allProcessors = await Processor.find().sort({ name: 1 }).exec();
  res.render('processor_list', {
    title: 'Processors',
    processor_list: allProcessors,
  });
});

