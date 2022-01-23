import createSeatingPlan from './table-service/createSeatingPlan';
import createOrder from './table-service/createOrder';
import installCustomers from './table-service/installCustomers';
import getSeatingPlanByShiftId from './table-service/getSeatingPlanByShiftId';
import updateSeatingPlan from './table-service/updateSeatingPlan';
import checkOut from './table-service/checkOut';

const TableService = {
  createSeatingPlan,
  createOrder,
  installCustomers,
  getSeatingPlanByShiftId,
  updateSeatingPlan,
  checkOut
};

export default TableService;
