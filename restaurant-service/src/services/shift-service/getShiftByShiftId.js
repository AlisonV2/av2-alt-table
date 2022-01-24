import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const getShiftByShiftId = async (shift_id) => {
  try {
    const { shift } = await axios.get(
      `${process.env.SHIFT_SERVICE_URL}/${req.body.shift_id}`
    );
    return shift;
  } catch (err) {
    return {
      message: 'Error getting shift',
      error: err.message,
    };
  }
};

export default getShiftByShiftId;