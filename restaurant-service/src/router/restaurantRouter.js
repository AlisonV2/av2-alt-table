import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import express from 'express';
import KitchenService from '../services/KitchenService';
import ShiftService from '../services/ShiftService';
import TableService from '../services/TableService';

const router = express.Router();
router.use('/', swaggerUi.serve);

router.get('/menu', KitchenService.getMenu);
router.get('/dish', KitchenService.getDishes);
router.get('/dish/:name', KitchenService.getDishByName);
router.post('/dish', KitchenService.createDish);
router.put('/dish/:name', KitchenService.updateDishQuantity);
router.post('/rating', KitchenService.rateDish);

router.post('/shift', ShiftService.createShift);
router.get('/shift/:shift_id', ShiftService.getShiftState);

router.put('/table', TableService.installCustomers);
router.post('/order', TableService.createOrder);
router.post('/checkout', TableService.checkOut);
router.post('/seating-plan', TableService.createSeatingPlan);
router.put('/seating-plan/:shift_id', TableService.updateSeatingPlan);
router.get('/seating-plan/:shift_id', TableService.getSeatingPlanByShiftId);

router.get('/docs', swaggerUi.setup(swaggerDocument));

export { router as restaurantRouter };
