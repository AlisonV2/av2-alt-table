import express from 'express';
import { getTables, createTables, installCustomers, updateCurrentBill, getTableByNumber } from '../controllers/TableController';
import { getSeatingPlanByShiftId, createSeatingPlan, updateSeatingPlan } from '../controllers/SeatingPlanController';
import { createOrder, checkOut } from '../controllers/OrderController';

const router = express.Router();

router.get('/table', getTables);
router.post('/table', createTables);
router.put('/table', installCustomers);
router.get('/table/:table_number', getTableByNumber)
router.get('/seating-plan/:shift_id', getSeatingPlanByShiftId);
router.post('/seating-plan', createSeatingPlan);
router.put('/seating-plan/:shift_id', updateSeatingPlan);
router.post('/order', createOrder);
router.post('/checkout', checkOut);
router.put('/bill', updateCurrentBill);

export { router as tableRouter };
