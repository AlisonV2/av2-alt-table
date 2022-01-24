import dotenv from 'dotenv';
import getDishByName from './kitchen-service/getDishByName';
import updateDishQuantity from './kitchen-service/updateDishQuantity';
import rateDish from './kitchen-service/rateDish';

dotenv.config();

const baseUrl = process.env.KITCHEN_SERVICE_URL;

const getMenu = (req, res) => {
  res.redirect(307, `${baseUrl}/menu`);
};

const getDishes = (req, res) => {
  res.redirect(307, `${baseUrl}/dish`);
};

const createDish = (req, res) => {
  res.redirect(307, `${baseUrl}/dish`);
};

const modifyDishQuantity = (req, res) => {
  res.redirect(307, `${baseUrl}/dish/${req.params.name}`);
};

const KitchenService = {
  getMenu,
  getDishes,
  createDish,
  modifyDishQuantity,
  getDishByName,
  updateDishQuantity,
  rateDish,
};

export default KitchenService;
