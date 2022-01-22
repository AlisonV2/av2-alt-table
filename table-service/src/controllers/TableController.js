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


export { getTables, createTables };
