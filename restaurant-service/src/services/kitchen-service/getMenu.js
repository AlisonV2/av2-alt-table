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

export default getMenu;