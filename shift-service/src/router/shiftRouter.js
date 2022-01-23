import express from 'express';
import { createShift, getShiftByShiftId } from '../controllers/ShiftController';
import {
  createOrder,
  checkOut,
  getOrdersByTableNumber,
} from '../controllers/OrderController';

const router = express.Router();

router.post('/shift', createShift);
router.get('/shift/:shift_id', getShiftByShiftId);
router.post('/order', createOrder);
router.post('/order/:table_number', getOrdersByTableNumber);
router.post('/checkout', checkOut);

export { router as shiftRouter };
