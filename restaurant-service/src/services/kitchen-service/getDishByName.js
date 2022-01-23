import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const getDishByName = async (req, res) => {
  try {
    const { data } = await axios.get(
      `${process.env.KITCHEN_SERVICE_URL}/dish/${req.params.name}`
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({
      message: 'No dish found',
    });
  }
};

export default getDishByName;