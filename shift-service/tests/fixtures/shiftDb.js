import mongoose from 'mongoose';
import Shift from '../../src/models/ShiftModel';

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

const setupDb = async () => {
  await Shift.deleteMany();
  await Shift.insertMany([shift1, shift2]);
};

export { setupDb, shift2, shift3 };
