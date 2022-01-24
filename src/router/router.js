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
router.post('/dish', KitchenController.createDish); // params: dish model
router.put('/dish', KitchenController.updateDishQuantity); // params: name, quantity

router.post('/seating-plan', ShiftController.createSeatingPlan); 
router.put('/seating-plan', ShiftController.updateSeatingPlan);
router.post('/shift', ShiftController.createShift);

router.put('/table', TableController.installCustomers); // params: shift_id, number of customers, table_number
router.post('/order', TableController.createOrder);
router.post('/checkout', TableController.checkoutTable);

export default router;
