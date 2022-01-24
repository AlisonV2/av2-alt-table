import mongoose from 'mongoose';
import Shift from '../../src/shift-service/models/ShiftModel';
import Table from '../../src/table-service/models/TableModel';
import Order from '../../src/shift-service/models/OrderModel';
import Dish from '../../src/kitchen-service/models/DishModel';
import SeatingPlan from '../../src/table-service/models/SeatingPlanModel';

const id1 = new mongoose.Types.ObjectId();
const id2 = new mongoose.Types.ObjectId();
const id3 = new mongoose.Types.ObjectId();

const shift1 = {
  _id: id1,
  shift_id: '2022-01-24T10:12:00.005Z',
  started_at: '12:00',
};

const shift2 = {
  _id: id2,
  shift_id: '2022-02-24T10:12:00.005Z',
  started_at: '18:00',
};

const shift3 = {
  shift_id: '2021-01-24T10:12:00.005Z',
  started_at: '12:00',
};

const order1 = {
  _id: id1,
  table_number: 1,
  shift_id: '2022-01-24T10:12:00.005Z',
  dishes: [
    {
      name: 'Dish1',
      price: 10,
    },
  ],
  bill_paid: false,
};

const order2 = {
  _id: id2,
  table_number: 2,
  shift_id: '2021-01-24T10:12:00.005Z',
  dishes: [],
  bill_paid: false,
};

const order3 = {
  _id: id3,
  table_number: 1,
  shift_id: '2022-02-24T10:12:00.005Z',
  dishes: [
    {
      name: 'Dish1',
      price: 10,
    },
  ],
  bill_paid: false,
};

const dish1 = {
  _id: id1,
  name: 'TestDish',
  description: 'Whatever',
  type: 'appetizer',
  price: 10.00,
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
  price: 10.00,
  quantity: 0,
};

const dish4 = {
  name: 'TestDish4',
  description: 'Whatever',
  type: 'dessert',
  price: 15.00,
  quantity: 0,
};

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

const seatingPlan1 = {
  _id: id1,
  shift_id: '2022-01-25T10:12:00.005Z',
  tables: [table1, table2],
};

const seatingPlan2 = {
  shift_id: '2022-01-24T10:18:00.005Z',
  tables: [table3, table4],
};

const setupDb = async () => {
  await Table.deleteMany();
  await Table.insertMany([table1, table2, table3]);
  await SeatingPlan.deleteMany();
  await SeatingPlan.insertMany([seatingPlan1]);
  await Dish.deleteMany();
  await Dish.insertMany([dish1, dish2, dish3]);
  await Shift.deleteMany();
  await Shift.insertMany([shift1, shift2]);
  await Order.deleteMany();
  await Order.insertMany([order1, order2, order3]);
};

export {
  setupDb,
  table2,
  table4,
  seatingPlan1,
  seatingPlan2,
  dish4,
  dish3,
  shift2,
  shift3,
  order1,
};
