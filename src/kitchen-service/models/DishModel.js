import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const dishSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: String,
        enum: ['appetizer', 'starter', 'main', 'dessert', 'drink'],
        required: true
    },
    description: {
        type: String,
        required: true,
        default: ''
    },
    price: {
        type: Number,
        default: 0.00,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        default: 0,
        required: true,
        min: 0
    }
});

const Dish = mongoose.model('Dish', dishSchema);

export default Dish;