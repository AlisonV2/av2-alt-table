import mongoose from 'mongoose';
import SeatingPlan from '../../src/models/SeatingPlanModel';

const id1 = new mongoose.Types.ObjectId();
const id2 = new mongoose.Types.ObjectId();
const id3 = new mongoose.Types.ObjectId();

const plan1 = {
  _id: id1,
  table_number: 1,
  seats: 4,
  status: 'available',
  orders: [],
  customers: 0,
};

const seatingPlan = {
  _id: id2,
  table_number: 2,
  seats: 6,
  status: 'available',
  orders: [],
  customers: 0,
};


const setupDb = async () => {
  await Table.deleteMany();
  await Table.insertMany([table1, table2, table3]);
};

export { setupDb, table3, table4 };