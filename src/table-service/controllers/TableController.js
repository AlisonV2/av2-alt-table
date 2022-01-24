import Table from '../models/TableModel';
import Shift from '../../shift-service/models/ShiftModel';

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

const installCustomers = async (req, res) => {
  try {
    const shift = await Shift.findOne({ shift_id: req.body.shift_id });

    if (!shift) {
      return res.status(404).json({
        message: 'Shift not found',
      });
    }

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

export {
  getTables,
  installCustomers,
};
