import Shift from '../models/ShiftModel';
import SeatingPlan from '../models/SeatingPlan';
import checkDuplicatedTables from '../helpers/checkDuplicatedTables';
import checkNegativeNumbers from '../helpers/checkNegativeNumbers';

class ShiftService {

  static checkTableValidity(tables) {
    const isDuplicated = checkDuplicatedTables(tables);
    const isNegative = checkNegativeNumbers(tables);
    if (isDuplicated && isNegative) {
      throw new Error('Invalid tables');
    }
  }

  static async getShift(shift_id) {
    const shift = Shift.findOne({ shift_id });
    if (!shift) {
      throw new Error(404);
    }
    return shift;
  }

  static async getShiftByShiftId(shift_id) {
    const shift = await Shift.findOne({ shift_id: req.params.shift_id });
    if (!shift) {
      throw new Error(404);
    }
    return shift;
  }

  static async createShift(shift_id, started_at) {
    const shift = new Shift({
      shift_id: shift_id,
      started_at: started_at,
    });
    return shift.save();
  }

  static async createSeatingPlan(shift_id, tables = []) {
    this.checkTableValidity(tables);
    const seatingPlan = new SeatingPlan({
      shift_id: shift_id,
      tables: tables,
    });
    return seatingPlan.save();
  }

  static async getSeatingPlan(shift_id) {
    const seatingPlan = await SeatingPlan.findOne({ shift_id });
    if (!seatingPlan) {
      throw new Error(404);
    }
    return seatingPlan;
  }

  static async updateSeatingPlan(shift_id, tables) {
    this.checkTableValidity(tables);

    const seatingPlan = await SeatingPlan.findOneAndUpdate(
      { shift_id },
      { tables },
      { useFindAndModify: false, new: false }
    );
    if (!seatingPlan) {
      throw new Error(404);
    }
    return seatingPlan;
  }
}

export default ShiftService;
