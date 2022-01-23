import mongoose from 'mongoose';
import Table from '../../src/models/TableModel';
import SeatingPlan from '../../src/models/SeatingPlanModel';
import Order from '../../src/models/OrderModel';

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
  meal_state: 'in-progress'
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

const seatingPlan1 = {
  _id: id1,
  shift_id: '25-11-1996-dinner',
  tables: [table1, table2],
};

const seatingPlan2 = {
  shift_id: '25-11-1996-lunch',
  tables: [table3, table4],
};

const order1 = {
  _id: id1,
  table_number: 1,
  shift_id: '25-11-1996-dinner',
  dishes: [
    {
      name: 'Dish1',
      price: 10,
    },
  ],
  bill_paid: false
};

const order2 = {
  _id: id2,
  table_number: 2,
  shift_id: '26-11-1996-lunch',
  dishes: [],
  bill_paid: false
};

const setupDb = async () => {
  await Table.deleteMany();
  await Table.insertMany([table1, table2, table3]);
  await SeatingPlan.deleteMany();
  await SeatingPlan.insertMany([seatingPlan1]);
  await Order.deleteMany();
  await Order.insertMany([order1, order2]);
};

export { setupDb, table2, table4, seatingPlan1, seatingPlan2, order1 };
