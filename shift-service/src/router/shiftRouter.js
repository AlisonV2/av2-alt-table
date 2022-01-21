import express from 'express';
import { createShift } from '../controllers/ShiftController';

const router = express.Router();

router.post('/', createShift)

export { router as shiftRouter };