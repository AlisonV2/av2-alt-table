import createSeatingPlan from './table-service/createSeatingPlan';
import createOrder from './table-service/createOrder';
import installCustomers from './table-service/installCustomers';
import getSeatingPlanByShiftId from './table-service/getSeatingPlanByShiftId';
import updateSeatingPlan from './table-service/updateSeatingPlan';

const TableService = {
  createSeatingPlan,
  createOrder,
  installCustomers,
  getSeatingPlanByShiftId,
  updateSeatingPlan,
};

export default TableService;
