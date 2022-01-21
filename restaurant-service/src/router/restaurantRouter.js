import express from 'express';
import {
  getMenu,
  getDishes,
  getDishById,
  createDish,
  updateDishQuantity,
} from '../services/MenuService';
// import { createShift, getShiftById } from '../services/ShiftService';
import {
  createSeatingPlan,
  updateSeatingPlan,
  getSeatingPlanById,
} from '../services/TableService';
import axios from 'axios';
import getEvent from '../events/getEvent'

const router = express.Router();

router.get('/menu', getMenu);
router.get('/dish', getDishes);
router.get('/dish/:id', getDishById);
router.post('/dish', createDish);
router.put('/dish/:id', updateDishQuantity);
// router.post('/shift', isSeatingPlanCreated, createShift);
// router.get('/shift/:id', isSeatingPlanCreated, getShiftById);
router.post('/seating-plan', createSeatingPlan);
router.put('/seating-plan/:id', updateSeatingPlan);
router.get('/seating-plan/:id', getSeatingPlanById);

export { router as restaurantRouter };

// NOTE: SeatingPlan in tableservice?
