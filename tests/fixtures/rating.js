import mongoose from 'mongoose';

import { dish1, dish2, dish3 } from './dish';
import { shift1, shift2, shift3 } from './shift';

const id1 = new mongoose.Types.ObjectId();
const id2 = new mongoose.Types.ObjectId();
const id3 = new mongoose.Types.ObjectId();

const rating1 = {
  _id: id1,
  dish_name: dish1.name,
  shift_id: shift1.shift_id,
  table_number: 1,
  score: 5,
  comment: 'This is a comment',
};

const rating2 = {
  _id: id2,
  dish_name: dish2.name,
  shift_id: shift2.shift_id,
  table_number: 1,
  score: 4,
  comment: 'This is a comment',
};

const rating3 = {
  _id: id3,
  dish_name: dish3.name,
  shift_id: shift1.shift_id,
  table_number: 1,
  score: 4,
  comment: 'This is a comment',
};

const rating4 = {
  shift_id: shift3.shift_id,
  name: dish3.name,
  table_number: 1,
  score: 3,
  comment: 'This is a comment',
};

export { rating1, rating2, rating3, rating4 };
