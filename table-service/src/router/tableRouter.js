import express from 'express';
import { getTables, createTables } from '../controllers/TableController';
import { getSeatingPlanById, createSeatingPlan, updateSeatingPlan } from '../controllers/SeatingPlanController';

const router = express.Router();

router.get('/tables', getTables);
router.post('/tables', createTables);
router.get('/seating-plan/:id', getSeatingPlanById);
router.post('/seating-plan', createSeatingPlan);
router.put('/seating-plan/:id', updateSeatingPlan);

export { router as tableRouter };
