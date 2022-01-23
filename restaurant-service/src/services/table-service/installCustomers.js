import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const installCustomers = async (req, res) => {
  const { shift } = await axios.get(
    `${process.env.SHIFT_SERVICE_URL}/${req.body.shift_id}`
  );
  if (!shift) {
    res.status(400).json({
      message: 'Shift has not been started yet',
    });
    return;
  }

  try {
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