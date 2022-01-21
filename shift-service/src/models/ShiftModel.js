import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const shiftSchema = new Schema({
  shift_id: {
    type: String,
    require: true,
    unique: true,
  },
  started_at: {
    type: Date,
    require: true,
  }
});

const Shift = mongoose.model('Shift', shiftSchema);

export default Shift;
