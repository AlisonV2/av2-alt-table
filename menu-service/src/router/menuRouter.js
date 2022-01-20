import express from 'express';
import { getDishes, createDish, updateDishQuantity, getDishById } from '../controllers/DishController';

const router = express.Router();

router.get('/dish', getDishes);
router.post('/dish', createDish);
router.put('/dish/:id', updateDishQuantity);
router.get('/dish/:id', getDishById);

export { router as menuRouter };
