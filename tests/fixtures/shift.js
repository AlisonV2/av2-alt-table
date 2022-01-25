import mongoose from 'mongoose';

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
  started_at: '12:00',
};

const shift3 = {
  _id: id3,
  shift_id: '2022-03-24T10:12:00.005Z',
  started_at: '12:00',
};

const shift4 = {
  shift_id: '2020-04-24T10:12:00.005Z',
  started_at: '12:00',
};


export { shift1, shift2, shift3, shift4 };
