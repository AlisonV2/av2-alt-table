import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const createShift = async (req, res) => {
  const { seatingPlan } = await axios.get(
    `${process.env.TABLE_SERVICE_URL}/seating-plan/${req.body.shift_id}`
  );
  if (!seatingPlan) {
    return res.status(404).send({
      message: 'You must create a seating plan first',
    });
  }

  try {
    const { data } = await axios.post(
      `${process.env.SHIFT_SERVICE_URL}`,
      req.body
    );

    const { tables } = await axios.post(
      `${process.env.TABLE_SERVICE_URL}/tables`,
      seatingPlan[0].content.tables
    );
    res.status(201).json({
      message: 'Shift created successfully',
      data: data,
      tables: tables,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export default createShift;