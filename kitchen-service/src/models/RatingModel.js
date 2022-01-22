import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  dish_name: {
    type: String,
    require: true,
  },
  comment: {
    type: String,
  },
  score: {
    type: Number,
    require: true,
    min: 0,
    max: 5,
  },
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
