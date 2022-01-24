import Table from '../models/TableModel';
import Order from '../models/OrderModel';

class TableService {
  static async getTables() {
    return Table.find();
  }

  static async createTables(tables = []) {
    return Table.insertMany(tables);
  }

  static async getTableByNumber(table_number) {
    const table = await Table.findOne({ table_number });
    if (!table) {
      throw new Error(404);
    }
    return table;
  }

  static async updateTableStatus(id, status, customers) {
    return Table.findByIdAndUpdate(
      id,
      { status, customers },
      { useFindAndModify: false, new: false }
    );
  }

  static async updateTableBill(id, bill) {
    return Table.findByIdAndUpdate(
      id,
      { bill },
      { useFindAndModify: false, new: false }
    );
  }

  static async createOrder(shift_id, table_number, dishes = []) {
    const order = new Order({
      shift_id,
      table_number,
      dishes,
    });
    return order.save();
  }

  static async getOrders(shift_id, table_number) {
    const orders = await Order.find({
      shift_id,
      table_number,
      bill_paid: false,
    });

    if (!orders.length) {
      throw new Error('No order found');
    }
    return orders;
  }

  static async payOrdersBills(shift_id, table_number, tip) {
    let totalBill = tip ?? 0;
    const orders = await this.getOrders(shift_id, table_number);

    for (let i in orders) {
      totalBill += orders[i].bill;
      await Order.findByIdAndUpdate(
        orders[i]._id,
        {
          bill_paid: true,
        },
        { useFindAndModify: false, new: false }
      );
    }
    return totalBill;
  }

  static async resetTable(table_number) {
    const table = await this.getTableByNumber(table_number);

    if (table.status !== 'occupied') {
      throw new Error('Table is not occupied');
    }

    table.status = 'available';
    table.customers = 0;
    table.current_bill = 0;
    table.meal_state = 'not-started';

    return table.save();
  }
}

export default TableService;
