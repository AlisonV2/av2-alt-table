import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import KitchenController from '../controllers/KitchenController';
import TableController from '../controllers/TableController';
import ShiftController from '../controllers/ShiftController';

const router = express.Router();

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));

router.get('/menu', KitchenController.getMenu);
router.get('/dish', KitchenController.getDishes);
router.post('/dish', KitchenController.createDish);
router.put('/dish', KitchenController.updateDishQuantity);
router.post('/rating', KitchenController.rateDish);

router.post('/seating-plan', ShiftController.createSeatingPlan); 
router.put('/seating-plan', ShiftController.updateSeatingPlan);
router.post('/shift', ShiftController.createShift);
router.get('/shift/:shift_id', ShiftController.getShiftState)

router.put('/table', TableController.installCustomers);
router.post('/order', TableController.createOrder);
router.post('/checkout', TableController.checkoutTable);

export default router;
