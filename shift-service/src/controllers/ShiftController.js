import Shift from '../models/ShiftModel';

const createShift = async (req, res) => {
  try {
    const shift = new Shift({
      shift_id: req.body.shift_id,
      started_at: req.body.started_at,
    });
    await shift.save();
    res.status(201).json({
      message: 'Shift created successfully',
      shift: shift,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error creating shift',
      error: err.message,
    });
  }
};

const getShiftByShiftId = async (req, res) => {
  try {
    const shift = await Shift.findOne({ shift_id: req.params.shift_id });
    if (!shift) {
      return res.status(404).json({
        message: 'Shift not found',
      });
    }
    res.status(200).json({
      message: 'Shift found',
      shift: shift,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error getting shift',
      error: err.message,
    });
  }
}

export { createShift, getShiftByShiftId };
