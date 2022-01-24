import mongoose from 'mongoose';

import { shift1, shift2, shift3 } from './shift';
import { dish1, dish2, dish3 } from './dish';

const id1 = new mongoose.Types.ObjectId();
const id2 = new mongoose.Types.ObjectId();
const id3 = new mongoose.Types.ObjectId();

const order1 = {
  _id: id1,
  table_number: 1,
  shift_id: shift1.shift_id,
  dishes: [dish1, dish2, dish3],
  bill_paid: false,
};

const order2 = {
  _id: id2,
  table_number: 2,
  shift_id: shift2.shift_id,
  dishes: [],
  bill_paid: false,
};

const order3 = {
  _id: id3,
  table_number: 1,
  shift_id: shift1.shift_id,
  dishes: [dish1, dish2, dish3],
  bill_paid: false,
};

const order4 = {
  table_number: 1,
  shift_id: shift3.shift_id,
  dishes: [dish1, dish2],
  bill_paid: false,
};

export { order1, order2, order3, order4 };
