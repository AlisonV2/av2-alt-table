import dotenv from 'dotenv';
import axios from 'axios';
import checkDuplicatedTables from '../../helpers/checkDuplicatedTables';
import checkNegativeNumbers from '../../helpers/checkNegativeNumbers';

dotenv.config();

const createSeatingPlan = async (req, res) => {
  const isDuplicated = checkDuplicatedTables(req.body.tables);
  const isNegative = checkNegativeNumbers(req.body.tables);

  if (isDuplicated || isNegative) {
    res.status(400).json({
      error: 'Invalid tables',
    });
    return;
  }

  try {
    const { data } = await axios.post(
      `${process.env.TABLE_SERVICE_URL}/seating-plan`,
      req.body
    );
    res.status(200).json({
      message: 'Seating plan created successfully',
      data: data.seatingPlan,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error creating Seating plan',
    });
  }
};

export default createSeatingPlan;