import express from 'express';
import { getTables } from '../controllers/TableController';

const router = express.Router();

router.get('/', getTables);
router.post('/', createTable);
router.get('/seating-plan/:id', getSeatingPlanById);
router.post('/seating-plan', createSeatingPlan);
router.put('/seating-plan', updateSeatingPlan);

export { router as tableRouter };
