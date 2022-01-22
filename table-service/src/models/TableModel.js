import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tableSchema = new Schema({
    table_number: {
        type: Number,
        required: true,
        unique: true,
    },
    seats: {
        type: Number,
        default: 0,
        required: true,
        min: 0
    },
    status: {
        type: String,
        default: 'available',
        enum: ['available', 'occupied', 'reserved']
    },
    orders: {
        type: Array,
        default: [],
    },
    customers: {
        type: Number,
        default: 0,
        min: 0
    }
});

const Table = mongoose.model('Table', tableSchema);

export default Table;