import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const updateCurrentBill = async (table_number, current_bill) => {
  try {
    await axios.put(`${process.env.TABLE_SERVICE_URL}/table/${table_number}`, {
      bill: current_bill,
    });
  } catch (err) {
    return err.message;
  }
};

export default updateCurrentBill;
