import express from 'express';
import { getMenu, getDishes, getDishById, createDish, updateDish } from '../services/MenuService';
import { createShift, getShiftById } from '../services/ShiftService';
import { createSeatingPlan, updateSeatingPlan, getSeatingPlanById } from '../services/TableService';

const router = express.Router();

router.get('/menu', getMenu);
router.get('/dish', getDishes);
router.get('/dish/:id', getDishById);
router.post('/dish', createDish);
router.put('/dish/:id', updateDish);
router.post('/shift', createShift);
router.get('/shift/:id', getShiftById);
router.post('/seating-plan', createSeatingPlan);
router.put('/seating-plan/:id', updateSeatingPlan);
router.get('/seating-plan/:id', getSeatingPlanById);


export { router as restaurantRouter };
