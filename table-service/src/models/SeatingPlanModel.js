import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const seatingPlanSchema = new Schema({
    tables: {
        type: Array,
        required: true
    }
});

const SeatingPlan = mongoose.model('SeatingPlan', seatingPlanSchema);

export default SeatingPlan;