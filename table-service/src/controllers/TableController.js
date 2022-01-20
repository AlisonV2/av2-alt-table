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

export { getTables };
