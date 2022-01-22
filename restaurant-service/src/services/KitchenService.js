import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const getMenu = async (req, res) => {
  try {
    const { data } = await axios.get(process.env.KITCHEN_SERVICE_URL);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({
      message: 'No menu found',
    });
  }
};

const getDishes = async (req, res) => {
  try {
    const { data } = await axios.get(`${process.env.KITCHEN_SERVICE_URL}/dish`);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({
      message: 'No dishes found',
    });
  }
};

const getDishById = async (req, res) => {
  try {
    const { data } = await axios.get(
      `${process.env.KITCHEN_SERVICE_URL}/dish/${req.params.id}`
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({
      message: 'No dish found',
    });
  }
};

const createDish = async (req, res) => {
  try {
    const { data } = await axios.post(
      `${process.env.KITCHEN_SERVICE_URL}/dish`,
      req.body
    );
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({
      message: 'Dish creation failed',
    });
  }
};

const updateDishQuantity = async (req, res) => {
  try {
    const { data } = await axios.put(
      `${process.env.KITCHEN_SERVICE_URL}/dish/${req.params.id}`,
      req.body
    );
    res.status(200).json({
      message: 'Dish updated successfully',
      dish: data,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Dish update failed',
    });
  }
};

export { getMenu, getDishes, getDishById, createDish, updateDishQuantity };
