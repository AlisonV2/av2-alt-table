import express from 'express';
import {
  createShift,
  getShiftByShiftId,
} from '../shift-service/controllers/ShiftController';
import {
  createOrder,
  checkOut,
} from '../shift-service/controllers/OrderController';

const router = express.Router();

router.post('/shift', createShift);
router.get('/shift/:shift_id', getShiftByShiftId);
router.post('/order', createOrder);
router.post('/checkout', checkOut);

export { router as shiftRouter };
