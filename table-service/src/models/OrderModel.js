import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  shift_id: {
    type: String,
    required: true,
  },
  table_number: {
    type: Array,
    required: true,
  },
  dishes: {
    type: Array,
    required: true,
  },
  bill_paid: {
    type: Boolean,
    default: false,
  },
  comment: {
    type: String,
    default: '',
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
