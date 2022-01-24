import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const getTableByNumber = async (table_number) => {
  try {
    const { data } = await axios.get(
      `${process.env.TABLE_SERVICE_URL}/table/${table_number}`
    );
    return data;
  } catch (err) {
    return err.message;
  }
};

export default getTableByNumber;
