import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tableSchema = new Schema({
    table_number: {
        type: Number,
        required: true,
        unique: true,
        min: 0
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
    customers: {
        type: Number,
        default: 0,
        min: 0
    },
    current_bill: {
        type: Number,
        default: 0,
    },
    meal_state: {
        type: String,
        enum: ['not-started', 'in-progress', 'finished'],
        default: 'not-started'
    }
});

const Table = mongoose.model('Table', tableSchema);

export default Table;