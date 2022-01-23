import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const getShiftState = async (req, res) => {
  try {
    const { data } = await axios.get(`${process.env.TABLE_SERVICE_URL}/table`);

    if (data.tables.length === 0) {
      return res.status(400).json({
        message: 'No table found',
      });
    }

    let tables = [];
    let orderedDishes = [];

    for (let i in data.tables) {
      if (data.tables[i].status === 'occupied') {
        const response = await axios.post(
          `${process.env.TABLE_SERVICE_URL}/order/${data.tables[i].table_number}`,
          {
            shift_id: req.params.shift_id,
          }
        );
        for (let j in response.data.orders) {
          orderedDishes = [...orderedDishes, response.data.orders[j]];
        }
        tables.push({
          ...data.tables[i],
          orders: orderedDishes,
        });
      }
    }

    res.status(200).json({
      message: 'Current state of the shift',
      tables: tables,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export default getShiftState;
