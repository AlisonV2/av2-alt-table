import mongoose from 'mongoose';

const id1 = new mongoose.Types.ObjectId();
const id2 = new mongoose.Types.ObjectId();
const id3 = new mongoose.Types.ObjectId();

const dish1 = {
  _id: id1,
  name: 'TestDish',
  description: 'Whatever',
  type: 'appetizer',
  price: 10.0,
  quantity: 2,
};

const dish2 = {
  _id: id2,
  name: 'TestDish2',
  type: 'dessert',
  description: 'Whatever',
  price: 15.99,
  quantity: 3,
};

const dish3 = {
  _id: id3,
  name: 'TestDish3',
  description: 'Whatever',
  type: 'main',
  price: 10.0,
  quantity: 0,
};

const dish4 = {
  name: 'TestDish4',
  description: 'Whatever',
  type: 'dessert',
  price: 15.0,
  quantity: 0,
};

export { dish1, dish2, dish3, dish4 };
