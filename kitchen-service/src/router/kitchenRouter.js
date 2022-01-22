import express from 'express';
import { getDishes, createDish, updateDishQuantity, getDishByName } from '../controllers/DishController';
import { getMenu } from '../controllers/MenuController'

const router = express.Router();

router.get('/', getMenu);
router.get('/dish', getDishes);
router.post('/dish', createDish);
router.put('/dish/:name', updateDishQuantity);
router.get('/dish/:name', getDishByName);


export { router as kitchenRouter };
