import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const checkOutTable = async (table_number) => {
  try {
    const { data } = await axios.post(
      `${process.env.TABLE_SERVICE_URL}/checkout`,
      {
        table_number: table_number
      }
    );
    return data;
  } catch (err) {
    return new Error(err.message);
  }
};

export default checkOutTable;
