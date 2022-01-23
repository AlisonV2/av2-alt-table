import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const getDishByName = async (dish_name) => {
  try {
    const { data } = await axios.get(
      `${process.env.KITCHEN_SERVICE_URL}/dish/${dish_name}`
    );
    return data;
  } catch (err) {
    return new Error(err.message);
  }
};

export default getDishByName;