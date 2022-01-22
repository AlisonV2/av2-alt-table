import express from 'express';
import { getTables, createTables, installCustomers } from '../controllers/TableController';
import { getSeatingPlanByShiftId, createSeatingPlan, updateSeatingPlan } from '../controllers/SeatingPlanController';

const router = express.Router();

router.get('/tables', getTables);
router.post('/tables', createTables);
router.put('/tables/:table_number', installCustomers);
router.get('/seating-plan/:shift_id', getSeatingPlanByShiftId);
router.post('/seating-plan', createSeatingPlan);
router.put('/seating-plan/:shift_id', updateSeatingPlan);

export { router as tableRouter };
