import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  created_at: {
    type: Date,
    default: Date.now(),
  },
  shift_id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  data: {
    type: Schema.Types.Mixed,
  },
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
