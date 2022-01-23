import dotenv from 'dotenv';
import axios from 'axios';
import checkDuplicatedTables from '../../helpers/checkDuplicatedTables';
import checkNegativeNumbers from '../../helpers/checkNegativeNumbers';

dotenv.config();

const updateSeatingPlan = async (req, res) => {
  const isDuplicated = checkDuplicatedTables(req.body.tables);
  const isNegative = checkNegativeNumbers(req.body.tables);

  if (isDuplicated || isNegative) {
    res.status(400).json({
      error: 'Invalid tables',
    });
    return;
  }
  try {
    const { data } = await axios.put(
      `${process.env.TABLE_SERVICE_URL}/seating-plan/${req.params.shift_id}`,
      req.body
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({
      message: 'Error updating Seating plan',
    });
  }
};

export default updateSeatingPlan;
