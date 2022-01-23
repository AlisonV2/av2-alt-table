import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const getSeatingPlanByShiftId = async (req, res) => {
  try {
    const { data } = await axios.get(
      `${process.env.TABLE_SERVICE_URL}/seating-plan/${req.params.shift_id}`
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({
      message: 'No seating plan found',
    });
  }
};

export default getSeatingPlanByShiftId;