import express from 'express';
import {
  getTables,
  createTables,
  installCustomers,
  updateCurrentBill,
  getTableByNumber,
  checkOutTable,
} from '../controllers/TableController';
import {
  getSeatingPlanByShiftId,
  createSeatingPlan,
  updateSeatingPlan,
} from '../controllers/SeatingPlanController';

const router = express.Router();

router.get('/table', getTables);
router.post('/table', createTables);
router.put('/table', installCustomers);
router.get('/table/:table_number', getTableByNumber);
router.put('/table/:table_number', updateCurrentBill);

router.post('/seating-plan', createSeatingPlan);
router.get('/seating-plan/:shift_id', getSeatingPlanByShiftId);
router.put('/seating-plan/:shift_id', updateSeatingPlan);

router.post('/checkout', checkOutTable);

export { router as tableRouter };
