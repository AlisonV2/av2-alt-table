import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    shift_id: {
        type: String,
        required: true
    },
    tables: {
        type: Array,
        required: true
    }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;