import express from 'express';
import { getDishes, createDish, updateDishQuantity, getDishByName } from '../controllers/DishController';
import { getMenu } from '../controllers/MenuController';
import { rateDish } from '../controllers/RatingController';

const router = express.Router();

router.get('/menu', getMenu);
router.get('/dish', getDishes);
router.post('/dish', createDish);
router.put('/dish/:name', updateDishQuantity);
router.get('/dish/:name', getDishByName);
router.post('/rating/:name', rateDish)


export { router as kitchenRouter };
