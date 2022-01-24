import express from 'express';
import { getDishes, createDish, updateDishQuantity } from '../kitchen-service/controllers/DishController';
import { getMenu } from '../kitchen-service/controllers/MenuController';

const router = express.Router();

router.get('/menu', getMenu);
router.get('/dish', getDishes);
router.post('/dish', createDish); // params: dish model
router.put('/dish', updateDishQuantity); // params: name, quantity

export { router as kitchenRouter };
