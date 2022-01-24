import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const seatingPlanSchema = new Schema({
    shift_id: {
        type: String,
        required: true,
        unique: true
    },
    tables: {
        type: Array,
        required: true
    }
});

const SeatingPlan = mongoose.model('SeatingPlan', seatingPlanSchema);

export default SeatingPlan;