import TableService from '../services/TableService';
import ShiftService from '../services/ShiftService';
import KitchenService from '../services/KitchenService';
import formatPrice from '../helpers/formatPrice';

class TableController {
  static async installCustomers(req, res) {
    const { shift_id, table_number, customers } = req.body;
    try {
      await ShiftService.getShift(shift_id);

      const table = await TableService.getTableByNumber(table_number);
      if (table.status !== 'available') {
        return res.status(400).json({
          message: 'Table is not available',
        });
      }
      if (table.seats < customers) {
        return res.status(400).json({
          message: 'Table does not have enough seats',
        });
      }

      const updatedTable = await TableService.updateTableStatus(
        table._id,
        'occupied',
        customers
      );
      res.status(200).json({
        message: 'Table installed successfully',
        table: updatedTable,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Error installing customers',
      });
    }
  }

  static async createOrder(req, res) {
    const { shift_id, table_number, dishes } = req.body;

    try {
      const tableData = await TableService.getTableByNumber(table_number);
      if (tableData.status !== 'occupied') {
        return res.status(400).json({
          message: 'Table has not been setup yet',
        });
      }

      await KitchenService.checkDishesForStock(dishes);
      const orderPrice = KitchenService.getOrderPrice(dishes);

      const table = await TableService.getTableByNumber(table_number);
      table.current_bill += orderPrice;
      await TableService.updateTableBill(table._id, table.current_bill);

      const order = await TableService.createOrder(
        shift_id,
        table_number,
        dishes
      );
      res.status(201).json({
        message: 'Order created successfully',
        order: order,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Error creating order',
      });
    }
  }

  static async checkoutTable(req, res) {
    const { shift_id, table_number, tip } = req.body;
    let dishes = [];
    try {
      const totalBill = await TableService.payOrdersBills(
        shift_id,
        table_number,
        tip
      );
      const newTable = await TableService.resetTable(table_number);
      res.status(200).json({
        message: 'Checkout successful',
        bill: formatPrice(totalBill),
        dishes: dishes,
        table: newTable,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Error checking out',
      });
    }
  }
}

export default TableController;
