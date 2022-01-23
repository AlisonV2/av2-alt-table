import mongoose from 'mongoose';
import Shift from '../../src/models/ShiftModel';
import Order from '../../src/models/OrderModel';

const id1 = new mongoose.Types.ObjectId();
const id2 = new mongoose.Types.ObjectId();

const shift1 = {
  _id: id1,
  shift_id: '12-05-15-lunch',
  started_at: '12:00',
};

const shift2 = {
  _id: id2,
  shift_id: '12-08-15-dinner',
  started_at: '18:00',
};

const shift3 = {
  shift_id: '12-03-15-lunch',
  started_at: '12:00',
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
  await Shift.deleteMany();
  await Shift.insertMany([shift1, shift2]);
  await Order.deleteMany();
  await Order.insertMany([order1, order2]);
};

export { setupDb, shift2, shift3, order1 };
