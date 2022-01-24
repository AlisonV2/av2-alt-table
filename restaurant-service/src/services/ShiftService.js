import createShift from './shift-service/createShift';
import getShiftState from './shift-service/getShiftState';
import createOrder from './shift-service/createOrder';
import checkOut from './shift-service/checkOut';
import getShiftByShiftId from './shift-service/getShiftByShiftId';

const ShiftService = {
    createShift,
    getShiftState,
    createOrder,
    checkOut,
    getShiftByShiftId,
};

export default ShiftService;