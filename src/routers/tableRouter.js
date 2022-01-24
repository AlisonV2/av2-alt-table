import express from 'express';
import { installCustomers } from '../table-service/controllers/TableController';
import {
  createSeatingPlan,
  updateSeatingPlan,
} from '../table-service/controllers/SeatingPlanController';

const router = express.Router();

router.post('/seating-plan', createSeatingPlan); // controller
router.put('/seating-plan', updateSeatingPlan); // controller
router.put('/table', installCustomers); // params: shift_id, number of customers, table_number

export { router as tableRouter };
