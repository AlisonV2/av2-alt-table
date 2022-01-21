import Shift from '../models/ShiftModel';
import createEvent from '../helpers/createEvent';

const createShift = async (req, res) => {
  try {
    const shift = new Shift({
      shift_id: req.body.shift_id,
      started_at: req.body.started_at,
    });
    await shift.save();
    createEvent('SHIFT_STARTED', shift);
    res.status(200).json({
      message: 'Shift created successfully',
      data: shift,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error creating shift',
      error: err.message,
    });
  }
};

export { createShift };
