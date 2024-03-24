#! /usr/bin/env node

console.log('This script populates some test pc parts and categories to your database');
const userArgs = process.argv.slice(2);

const Category = require('./models/category');
const Product = require('./models/product');

const categories = [];
const products = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createCategories();
  await createProducts();
};

async function categoryCreate(index, name) {
  const category = new Category({ name: name });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
};

async function productCreate(index, name, category, description, price, quantity) {
  const product = new Product({name: name, category: category, description: description, price: price, quantity: quantity});
  await product.save();
  products[index] = product;
  console.log(`Added product ${name}`);
}

async function createCategories() {
  console.log('Adding categories');
  await Promise.all ([
    categoryCreate(0, 'Graphics Cards'),
    categoryCreate(1, 'Memory'),
    categoryCreate(2, 'Motherboards'),
    categoryCreate(3, 'Processors'),
  ])
};

async function createProducts() {
  console.log('Adding products');
  await Promise.all([
    productCreate(
      0,
      'AMD Radeon RX 6950 XT',
      categories[0],
      'This is where you would put a desciption of the product. For now this is just placeholder text.',
      549.99,
      17
    ),
    productCreate(
      1,
      'NVIDIA GeForce RTX 4090',
      categories[0],
      'This is where you would put a desciption of the product. For now this is just placeholder text.',
      2099.99,
      3,
    ),
    productCreate(
      2,
      'NVIDIA GeForce RTX 4070',
      categories[0],
      'This is where you would put a desciption of the product. For now this is just placeholder text.',
      549.99,
      11,
    ),
    productCreate(
      0,
      'Intel Core i9-12900K',
      categories[3],
      'This is where you would put a desciption of the product. For now this is just placeholder text.',
      649.99,
      2,
    ),
    productCreate(
      0,
      'Intel Core i7-12700K',
      categories[3],
      'This is where you would put a desciption of the product. For now this is just placeholder text.',
      449.99,
      24,
    ),
    productCreate(
      0,
      'AMD Ryzen 7 5800X3D',
      categories[3],
      'This is where you would put a desciption of the product. For now this is just placeholder text.',
      449.99,
      23,
    ),
    productCreate(
      0,
      'G.Skill Ripjaws V 32GB',
      categories[1],
      'This is where you would put a desciption of the product. For now this is just placeholder text.',
      211.99,
      26,
    ),
    productCreate(
      1,
      'G.Skill Flare X5 Series 32GB',
      categories[1],
      'This is where you would put a desciption of the product. For now this is just placeholder text.',
      269.99,
      14,
    ),
    productCreate(
      2,
      'Corsair Vengeance LPX 64GB',
      categories[1],
      'This is where you would put a desciption of the product. For now this is just placeholder text.',
      164.99,
      22,
    ),
  ])
};

