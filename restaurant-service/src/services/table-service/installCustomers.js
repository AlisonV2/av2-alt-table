import dotenv from 'dotenv';
import axios from 'axios';
import ShiftService from '../ShiftService';

dotenv.config();

const installCustomers = async (req, res) => {
  try {
    const shift = await ShiftService.getShiftByShiftId(req.params.shift_id);

    if (!shift) {
      res.status(400).json({
        message: 'Shift has not been started yet',
      });
      return;
    }
    const { data } = await axios.put(
      `${process.env.TABLE_SERVICE_URL}/tables`,
      req.body
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({
      message: 'Error installing customers',
    });
  }
};

export default installCustomers;
