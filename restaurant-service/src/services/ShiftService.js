import dotenv from 'dotenv';
import axios from 'axios';
import getEvent from '../events/getEvent';

dotenv.config();

const createShift = async (req, res) => {
  let seatingPlan;
  const { event } = await getEvent('SEATING_PLAN_CREATED', req.body.shift_id);

  if (!event.length) {
    res.status(400).json({
      error: 'No seating plan created',
    });
    return;
  }

  seatingPlan = event;
  
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

export { createShift };
