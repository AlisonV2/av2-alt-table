import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const updateDishQuantity = async (req, res) => {
  try {
    const { data } = await axios.put(
      `${process.env.KITCHEN_SERVICE_URL}/dish/${req.params.name}`,
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

export default updateDishQuantity;