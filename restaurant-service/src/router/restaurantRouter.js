import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import express from 'express';
import {
  getMenu,
  getDishes,
  getDishByName,
  createDish,
  updateDishQuantity,
} from '../services/KitchenService';
import { createShift } from '../services/ShiftService';
import {
  createSeatingPlan,
  updateSeatingPlan,
  getSeatingPlanByShiftId,
  installCustomers
} from '../services/TableService';

const router = express.Router();
router.use('/', swaggerUi.serve);

router.get('/menu', getMenu);
router.get('/dish', getDishes);
router.get('/dish/:name', getDishByName);
router.post('/dish', createDish);
router.put('/dish/:name', updateDishQuantity);
router.post('/shift', createShift);
router.put('/tables', installCustomers);
router.post('/seating-plan', createSeatingPlan);
router.put('/seating-plan/:shift_id', updateSeatingPlan);
router.get('/seating-plan/:shift_id', getSeatingPlanByShiftId);
router.get('/docs', swaggerUi.setup(swaggerDocument));

export { router as restaurantRouter };
