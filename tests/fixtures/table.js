import mongoose from 'mongoose';

const id1 = new mongoose.Types.ObjectId();
const id2 = new mongoose.Types.ObjectId();
const id3 = new mongoose.Types.ObjectId();
 
const table1 = {
  _id: id1,
  table_number: 1,
  seats: 4,
  status: 'occupied',
  customers: 4,
  current_bill: 18.99,
  meal_state: 'in-progress',
};

const table2 = {
  _id: id2,
  table_number: 2,
  seats: 6,
  status: 'available',
  customers: 0,
};

const table3 = {
  _id: id3,
  table_number: 3,
  seats: 8,
  status: 'available',
  customers: 0,
};

const table4 = {
  table_number: 4,
  seats: 2,
  status: 'available',
  customers: 0,
};

export { table1, table2, table3, table4 };