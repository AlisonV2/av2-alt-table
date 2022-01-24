import Shift from '../models/ShiftModel';
import SeatingPlan from '../../table-service/models/SeatingPlanModel';
import Table from '../../table-service/models/TableModel';

const createShift = async (req, res) => {
  try {
    const seatingPlan = await SeatingPlan.findOne({
      shift_id: req.body.shift_id,
    });

    if (!seatingPlan) {
      return res.status(404).json({
        message: 'SeatingPlan not found',
      });
    }

    const shift = new Shift({
      shift_id: req.body.shift_id,
      started_at: req.body.started_at,
    });

    shift.save((err, newShift) => {
      if (err) {
        return res.status(400).json({
          message: 'Error creating shift',
          error: err.message,
        });
      }
      res.status(201).json({
        message: 'Shift created successfully',
        shift: newShift,
      });
    });

    Table.insertMany(seatingPlan.tables, (err, createdTables) => {
      if (err) {
        return res.status(400).json({
          message: 'Error creating tables',
          error: err.message,
        });
      }
      res.status(201).json({
        message: 'Tables created successfully',
        tables: createdTables,
      });
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
};

export { createShift, getShiftByShiftId };
