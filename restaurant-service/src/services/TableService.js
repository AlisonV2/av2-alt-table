import createSeatingPlan from './table-service/createSeatingPlan';
import installCustomers from './table-service/installCustomers';
import getSeatingPlanByShiftId from './table-service/getSeatingPlanByShiftId';
import updateSeatingPlan from './table-service/updateSeatingPlan';
import checkOutTable from './table-service/checkOutTable';

const TableService = {
  createSeatingPlan,
  installCustomers,
  getSeatingPlanByShiftId,
  updateSeatingPlan,
  checkOutTable
};

export default TableService;
