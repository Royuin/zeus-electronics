#! /usr/bin/env node

console.log('This script populates some test pc parts and categories to your database');

const Category = require('./models/category');
const GraphicsCard = require('./models/graphicsCard');
const Memory = require('./models/memory');
const Motherboard = require('./models/motherboard');
const Processor = require('./models/processor');

const categories = [];
const graphicsCards = [];
const memoryItems = [];
const motherboards = [];
const processors = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createCategories();
  await createGraphicsCards();
  await createMemoryProducts();
  await createMotherboards();
  await createProcessors();
}

async function categoryCreate(index, name) {
  const category = new Category({ name: name });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function graphicsCardCreate(index, name, category, description, price, quantity) {
  const graphicsCard = new GraphicsCard({ name: name, category: category, description: description, price: price, quantity: quantity });
  await graphicsCard.save();
  graphicsCards[index] = graphicsCard;
  console.log(`Added graphics card ${name}`);
}

async function memoryCreate(index, name, description, price, quantity) {
  const memory = new Memory({ name: name, category: category, description: description, price: price, quantity: quantity });
  await memory.save();
  memoryItems[index] = memory;
  console.log(`Added memory item ${name}`);
}

async function motherboardCreate(index, name, description, price, quantity) {
  const motherboard = new Motherboard({ name: name, category: category, description: description, price: price, quantity: quantity });
  await motherboard.save();
  motherboards[index] = motherboard;
  console.log(`Added motherboard ${name}`);
}

async function processorCreate(index, name, description, price, quantity) {
  const processor = new Processor({ name: name, category: category, description: description, price: price, quantity: quantity });
  await processor.save();
  processors[index] = processor;
  console.log(`Added processor ${name}`);
}

async function createCategories() {
  console.log('Adding categories');
  await Promise.all ([
    categoryCreate(0, 'Graphics Cards'),
    categoryCreate(1, 'Memory'),
    categoryCreate(2, 'Motherboards'),
    categoryCreate(3, 'Processors'),
  ])
}

async function createGraphicsCards() {
  console.log('Adding graphics cards');
  await Promise.all([
    graphicsCardCreate(
      0,
      'AMD Radeon RX 6950 XT',
      categories[0],
      'This is where you would put a desciption of the product. For now this is just placeholder text.',
      549.99,
      17
    ),
    graphicsCardCreate(
      1,
      'NVIDIA GeForce RTX 4090',
      categories[0],
      'This is where you would put a desciption of the product. For now this is just placeholder text.',
      2099.99,
      3,
    ),
    graphicsCardCreate(
      2,
      'NVIDIA GeForce RTX 4070',
      categories[0],
      'This is where you would put a desciption of the product. For now this is just placeholder text.',
      549.99,
      11,
    ),
  ])
}

async function createMemoryProducts() {
  console.log('Adding memory products');
  await Promise.all([
    memoryCreate(
      0,
      'G.Skill Ripjaws V 32GB',
      categories[1],
      'This is where you would put a desciption of the product. For now this is just placeholder text.',
      211.99,
      26,
    ),
  ])
}
