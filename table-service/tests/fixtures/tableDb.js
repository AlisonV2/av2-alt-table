import mongoose from 'mongoose';
import Table from '../../src/models/TableModel';

const id1 = new mongoose.Types.ObjectId();
const id2 = new mongoose.Types.ObjectId();
const id3 = new mongoose.Types.ObjectId();

const table1 = {
  _id: id1,
  table_number: 1,
  seats: 4,
  status: 'available',
  orders: [],
  customers: 0,
};

const table2 = {
  _id: id2,
  table_number: 2,
  seats: 6,
  status: 'available',
  orders: [],
  customers: 0,
};

const table3 = {
  _id: id3,
  table_number: 3,
  seats: 8,
  status: 'available',
  orders: [],
  customers: 0,
};

const table4 = 
{
  table_number: 4,
  seats: 2,
  status: 'available',
  orders: [],
  customers: 0
}

const setupDb = async () => {
  await Table.deleteMany();
  await Table.insertMany([table1, table2, table3]);
};

export { setupDb, table3, table4 };