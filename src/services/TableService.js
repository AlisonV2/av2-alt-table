import Table from '../models/TableModel';
import Order from '../models/OrderModel';

class TableService {
  static async getTables() {
    const tables = await Table.find();
    if (!tables.length) {
      throw new Error('No tables found');
    }
    return tables;
  }

  static async createTables(tables = []) {
    return Table.insertMany(tables);
  }

  static async getTableByNumber(table_number) {
    const table = await Table.findOne({ table_number });
    if (!table) {
      throw new Error('Table not found');
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
      { current_bill: bill },
      { useFindAndModify: false, new: false }
    );
  }

  static async createOrder(shift_id, table_number, bill, dishes = []) {
    const order = new Order({
      shift_id,
      table_number,
      bill,
      dishes,
    });
    return order.save();
  }

  static async getOrders(shift_id, table_number) {
    return Order.find({
      shift_id,
      table_number,
      bill_paid: false,
    });
  }

  static async getTablesState(shift_id, tables) {
    let orderedDishes = [];
    let tablesState = [];

    for (let i in tables) {
      const orders = await this.getOrders(shift_id, tables[i].table_number);
      for (let j in orders) {
        orderedDishes = [...orderedDishes, ...orders[j].dishes];
      }

      tablesState.push({
        table_number: tables[i].table_number,
        meal_state: tables[i].meal_state,
        status: tables[i].status,
        customers: tables[i].customers,
        current_bill: tables[i].current_bill,
        dishes: orderedDishes,
      });
    }
    return tablesState;
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
