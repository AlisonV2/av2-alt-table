import ShiftService from '../services/ShiftService';
import TableService from '../services/TableService';

class ShiftController {
  static async createSeatingPlan(req, res) {
    const { shift_id, tables } = req.body;
    try {
      const seatingPlan = await ShiftService.createSeatingPlan(shift_id, tables);
      res.status(201).json({
        message: 'Seating plan created successfully',
        seatingPlan: seatingPlan,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Error creating seating plan',
      });
    }
  }

  static async updateSeatingPlan(req, res) {
    const { shift_id, tables } = req.body;
    try {
      const seatingPlan = await ShiftService.updateSeatingPlan(shift_id, tables);
      res.status(200).json({
        message: 'Seating plan updated successfully',
        seatingPlan: seatingPlan,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Error updating seating plan',
      });
    }
  }

  static async createShift(req, res) {
    const { shift_id, started_at} = req.body;
    try {
      const seatingPlan = ShiftService.getSeatingPlan(shift_id);
      const shift = await ShiftService.createShift(shift_id, started_at)
      await TableService.createTables(seatingPlan.tables);

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
  }

  static async getShiftState(req, res) {
    const shift_id = req.params.shift_id;
    try {
      const tables = await TableService.getTables();
      const shiftState = await TableService.getOrderedDishes(shift_id, tables);
      
      res.status(200).json({
        message: 'Current state of the shift',
        state: shiftState
      });

    } catch (err) {
      res.status(400).json({
        message: 'Error getting shift state',
      });
    }
  }
}

export default ShiftController;
