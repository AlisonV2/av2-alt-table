import Table from '../models/TableModel';

const getTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.status(200).json({
      message: 'Tables fetched successfully',
      tables: tables,
    });
  } catch (err) {
    res.status(400).json({
      message: 'No tables found',
    });
  }
};

const createTables = (req, res) => {
  try {
    Table.insertMany(req.body, (err, tables) => {
      if (err) {
        res.status(400).json({
          message: 'Error creating tables',
        });
      } else {
        res.status(200).json({
          message: 'Tables created successfully',
          tables: tables,
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error creating tables',
    });
  }
};

const installCustomers = async (req, res) => {
  try {
    const table = await Table.findOne({
      table_number: req.body.table_number,
    });
    if (table.status !== 'available') {
      res.status(400).json({
        message: 'Table is not available',
      });
      return;
    }

    if (table.seats < req.body.customers) {
      res.status(400).json({
        message: 'Table does not have enough seats',
      });
      return;
    }

    table.status = 'occupied';
    table.customers = req.body.customers;
    table.save((err, newTable) => {
      if (err) {
        res.status(400).json({
          message: 'Error installing customers',
        });
      } else {
        res.status(200).json({
          message: 'Table installed successfully',
          table: newTable,
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error installing customers',
    });
  }
};

const updateCurrentBill = async (req, res) => {
  try {
    const table = await Table.findOne({
      table_number: req.body.table_number,
    });
    table.current_bill += req.body.bill;
    table.save((err, newTable) => {
      if (err) {
        res.status(400).json({
          message: 'Error updating current bill',
        });
      } else {
        res.status(200).json({
          message: 'Current bill updated successfully',
          table: newTable,
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error updating current bill',
    });
  }
}

export { getTables, createTables, installCustomers, updateCurrentBill };
