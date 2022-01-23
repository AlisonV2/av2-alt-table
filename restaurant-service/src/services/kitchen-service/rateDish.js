import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const rateDish = async (req, res) => {
  // shift_id, table_number, dish_name, score, comment
  try {
    const { data } = await axios.post(
      `${process.env.TABLE_SERVICE_URL}/order/${req.body.table_number}`,
      {
        shift_id: req.body.shift_id,
      }
    );
    if (data.orders.length === 0) {
      return res.status(400).json({
        message: 'No order found',
      });
    }

    let orderedDishes = [];

    for (let i in data.orders) {
      orderedDishes.push(data.orders[i].name);
    }

    if (orderedDishes.includes(req.body.dish_name)) {
      const { data } = await axios.post(
        `${process.env.KITCHEN_SERVICE_URL}/rating/${req.body.dish_name}`,
        {
          score: req.body.score,
          comment: req.body.comment,
        }
      );
      res.status(201).json(data);
    } else {
      return res.status(400).json({
        message: 'Dish not ordered',
      });
    }
  } catch (err) {
    res.status(400).json({
      message: 'Error getting orders',
    });
  }
};

export default rateDish;
