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
  await createMemory();
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

