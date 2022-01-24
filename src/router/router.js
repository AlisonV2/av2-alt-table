import express from 'express';
import { installCustomers } from '../table-service/controllers/TableController';
import { createSeatingPlan, updateSeatingPlan } from '../table-service/controllers/SeatingPlanController';
import { createShift } from '../shift-service/controllers/ShiftController';
import { createOrder, checkOut } from '../shift-service/controllers/OrderController';
import { getDishes, createDish, updateDishQuantity } from '../kitchen-service/controllers/DishController';
import { getMenu } from '../kitchen-service/controllers/MenuController';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

const router = express.Router();

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));

router.get('/menu', getMenu);
router.get('/dish', getDishes);
router.post('/dish', createDish); // params: dish model
router.put('/dish', updateDishQuantity); // params: name, quantity

router.post('/shift', createShift);
router.post('/order', createOrder);
router.post('/checkout', checkOut);

router.post('/seating-plan', createSeatingPlan); 
router.put('/seating-plan', updateSeatingPlan);
router.put('/table', installCustomers); // params: shift_id, number of customers, table_number

export default router;
