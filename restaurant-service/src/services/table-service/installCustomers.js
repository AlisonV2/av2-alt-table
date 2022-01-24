import dotenv from 'dotenv';
import ShiftService from '../ShiftService';
import TableService from '../TableService';

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

    const tables = await TableService.createTables(req.body);

    res.status(200).json(tables);
  } catch (err) {
    res.status(400).json({
      message: 'Error installing customers',
    });
  }
};

export default installCustomers;
