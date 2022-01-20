import dotenv from 'dotenv';

dotenv.config();

const getMenu = async (req, res) => {
  res.redirect(process.env.MENU_SERVICE_URL);
};

const getDishes = async (req, res) => {
  res.redirect(`${process.env.MENU_SERVICE_URL}dish`);
};

const getDishById = async (req, res) => {
  res.redirect(`${process.env.MENU_SERVICE_URL}dish/${req.params.id}`);
};

const createDish = async (req, res) => {
  res.redirect(307, `${process.env.MENU_SERVICE_URL}dish`);
};

const updateDishQuantity = async (req, res) => {
  res.redirect(307, `${process.env.MENU_SERVICE_URL}dish/${req.params.id}`);
};

export { getMenu, getDishes, getDishById, createDish, updateDishQuantity };
