import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

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

export default createDish;