import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  shift_id: {
    type: String,
    required: true,
  },
  table_number: {
    type: Number,
    required: true,
  },
  dishes: {
    type: Array,
    required: true,
  },
  bill: {
    type: Number,
    required: true,
  },
  bill_paid: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
