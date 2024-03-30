const { validationResult, body } = require('express-validator');
const Category = require('../models/category');
const Product = require('../models/product');

const asyncHandler = require('express-async-handler');

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();
  res.render('category_list', {
    title: 'All Categories',
    category_list: allCategories,
  });
})

exports.category_products = asyncHandler( async (req, res, next) => {
  const [category, products] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Product.find({category: req.params.id}).exec(),
  ]);

  res.render('category_products', {
    products: products,
    category: category,
  });
});

exports.category_create_get =  (req, res, next) => {
  res.render('category_form', {
    title: 'Create New Category',
  })
}

exports.category_create_post = [
  body('name', 'Category name must contain at least 3 characters.').trim().isLength({min: 3}).escape(),

  asyncHandler( async (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({name: req.body.name});

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Create New Category',
        errors: errors.array(),
      });
      return;
    } else  {
      const categoryExists = await Category.findOne({name: req.body.name}).collation({ locale: "en", strength: 2}).exec();
      if (categoryExists) {
        res.render('category_form', {
          title: 'Create New Category',
          category_exists: categoryExists,
          name: req.body.name,
          });
        return;
      } else {
        await category.save();
        res.redirect(category.url);
      }
    }
  }),
];

exports.category_update_get = asyncHandler( async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();

  res.render('category_form', {
    title: 'Update Category',
    name: category.name,
  });
})

exports.category_update_post = [
  body('name', 'Name must not be empty and at least 3 characters.').trim().isLength({min: 3}).escape(),

  asyncHandler( async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Update Category',
        name: req.body.name,
      });
    } else {
      const categoryExists = await Category.findOne({name: req.body.name});

      if (categoryExists) {
        res.render('category_form', {
          title: 'Update Category',
          name: req.body.name,
          category_exists: categoryExists,
        });
      } else {
        const update = {name: req.body.name};
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, update);
        res.redirect(updatedCategory.url);
      }
    }
  }),
];

exports.category_delete_get = asyncHandler( async (req, res, next) => {
  const [category, categoryProducts] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Product.find({category: req.params.id}).exec(),
  ]);

  console.log(categoryProducts);

  if (categoryProducts.length > 0) {
    res.render('category_delete', {
      category_products: categoryProducts,
      category: category,
    });
  } else {
    res.render('category_delete', {
      category: category,
      });
    }
});

exports.category_delete_post = asyncHandler( async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  await category.deleteOne();

  res.redirect('/catalog');
});
