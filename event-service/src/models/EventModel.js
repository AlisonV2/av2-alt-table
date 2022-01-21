import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  type: {
    type: String,
  },
  shift_id: {
    type: String,
  },
  content: {
    type: Schema.Types.Mixed,
  },
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
