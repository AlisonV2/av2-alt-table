import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  shift_id: {
    type: String,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  data: {
    type: Schema.Types.Mixed,
  },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
