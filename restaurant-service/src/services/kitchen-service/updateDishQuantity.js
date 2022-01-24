import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const updateDishQuantity = async (dish_name, quantity) => {
  try {
    await axios.put(`${process.env.KITCHEN_SERVICE_URL}/dish/${dish_name}`, {
      quantity: quantity,
    });
  } catch (err) {
    return err.message;
  }
};

export default updateDishQuantity;