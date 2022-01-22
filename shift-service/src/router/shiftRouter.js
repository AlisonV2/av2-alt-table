import express from 'express';
import { createShift, getShiftByShiftId } from '../controllers/ShiftController';

const router = express.Router();

router.post('/', createShift);
router.get('/:shift_id', getShiftByShiftId);

export { router as shiftRouter };