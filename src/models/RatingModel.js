import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  shift_id: {
    type: String,
    required: true,
  },
  table_number: {
    type: Number,
    required: true,
    min: 0
  },
  dish_name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
