import dotenv from 'dotenv';
import axios from 'axios';
import TableService from '../TableService';

dotenv.config();

const checkOut = async (req, res) => {
  try {
    await TableService.checkOutTable(req.body.table_number);

    const { data } = await axios.post(
      `${process.env.SHIFT_SERVICE_URL}/checkout`,
      req.body
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({
      message: 'Error checking out',
    });
  }
};

export default checkOut;
