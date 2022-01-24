import mongoose from 'mongoose';
import { table1, table2, table3, table4 } from './table';
import { shift1, shift2, shift3, shift4 } from './shift';

const id1 = new mongoose.Types.ObjectId();
const id2 = new mongoose.Types.ObjectId();
const id3 = new mongoose.Types.ObjectId();

const seatingPlan1 = {
  _id: id1,
  shift_id: shift1.shift_id,
  tables: [table1, table2],
};

const seatingPlan2 = {
  _id: id2,
  shift_id: shift2.shift_id,
  tables: [table1, table2, table3],
};

const seatingPlan3 = {
  _id: id3,
  shift_id: shift4.shift_id,
  tables: [table1, table2, table3],
};

const seatingPlan4 = {
  shift_id: shift3.shift_id,
  tables: [table3, table4],
};

export { seatingPlan1, seatingPlan2, seatingPlan3, seatingPlan4 };
