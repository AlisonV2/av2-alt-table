import express from 'express';
import { getTables, createTables, installCustomers, updateCurrentBill } from '../controllers/TableController';
import { getSeatingPlanByShiftId, createSeatingPlan, updateSeatingPlan } from '../controllers/SeatingPlanController';
import { createOrder } from '../controllers/OrderController';

const router = express.Router();

router.get('/table', getTables);
router.post('/table', createTables);
router.put('/table', installCustomers);
router.get('/seating-plan/:shift_id', getSeatingPlanByShiftId);
router.post('/seating-plan', createSeatingPlan);
router.put('/seating-plan/:shift_id', updateSeatingPlan);
router.post('/order', createOrder);
router.put('/bill', updateCurrentBill);

export { router as tableRouter };
