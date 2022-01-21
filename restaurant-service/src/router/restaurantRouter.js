import express from 'express';
import {
  getMenu,
  getDishes,
  getDishById,
  createDish,
  updateDishQuantity,
} from '../services/MenuService';
import { createShift } from '../services/ShiftService';
import {
  createSeatingPlan,
  updateSeatingPlan,
  getSeatingPlanById,
} from '../services/TableService';

const router = express.Router();

router.get('/menu', getMenu);
router.get('/dish', getDishes);
router.get('/dish/:id', getDishById);
router.post('/dish', createDish);
router.put('/dish/:id', updateDishQuantity);
router.post('/shift', createShift);
router.post('/seating-plan', createSeatingPlan);
router.put('/seating-plan/:id', updateSeatingPlan);
router.get('/seating-plan/:id', getSeatingPlanById);

export { router as restaurantRouter };

// NOTE: SeatingPlan in tableservice?
