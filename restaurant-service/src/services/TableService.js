import dotenv from 'dotenv';
import installCustomers from './table-service/installCustomers';
import checkOutTable from './table-service/checkOutTable';
import updateCurrentBill from './table-service/updateCurrentBill';
import getTableByNumber from './table-service/getTableByNumber';

dotenv.config();

const baseUrl = process.env.TABLE_SERVICE_URL;

const createSeatingPlan = (req, res) => {
  res.redirect(307, `${baseUrl}/seating-plan`);
};

const updateSeatingPlan = (req, res) => {
  res.redirect(307, `${baseUrl}/seating-plan/${req.params.shift_id}`);
};

const getSeatingPlanByShiftId = (req, res) => {
  res.redirect(307, `${baseUrl}/seating-plan/${req.params.shift_id}`);
};

const TableService = {
  createSeatingPlan,
  updateSeatingPlan,
  getSeatingPlanByShiftId,
  installCustomers,
  checkOutTable,
  updateCurrentBill,
  getTableByNumber,
};

export default TableService;
