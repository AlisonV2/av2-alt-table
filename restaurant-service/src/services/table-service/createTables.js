import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const createTables = (tables) => {
  try {
    const { data } = await axios.put(
      `${process.env.TABLE_SERVICE_URL}/tables`,
      req.body
    );

    return data;
  } catch (err) {
    return err.message;
  }
};

export default createTables;