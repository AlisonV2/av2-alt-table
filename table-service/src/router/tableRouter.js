import express from 'express';
import { getTables, createTables, installCustomers, updateCurrentBill, getTableByNumber } from '../controllers/TableController';
import { getSeatingPlanByShiftId, createSeatingPlan, updateSeatingPlan } from '../controllers/SeatingPlanController';
import { createOrder, checkOut, getOrdersByTableNumber } from '../controllers/OrderController';

const router = express.Router();

router.get('/table', getTables);
router.post('/table', createTables);
router.put('/table', installCustomers);
router.get('/table/:table_number', getTableByNumber)
router.put('/table/:table_number', updateCurrentBill);

router.get('/seating-plan/:shift_id', getSeatingPlanByShiftId);
router.put('/seating-plan/:shift_id', updateSeatingPlan);
router.post('/seating-plan', createSeatingPlan);

router.post('/order', createOrder);
router.post('/order/:table_number', getOrdersByTableNumber);

router.post('/checkout', checkOut);

export { router as tableRouter };
