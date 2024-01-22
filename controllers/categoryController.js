const Category = require('../models/category');
const GraphicsCard = require('../models/graphicsCard');

const asyncHandler = require('express-async-handler');

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
