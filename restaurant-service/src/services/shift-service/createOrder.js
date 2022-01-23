import dotenv from 'dotenv';
import axios from 'axios';
import KitchenService from '../KitchenService';

dotenv.config();

const createOrder = async (req, res) => {
  let orderPrice = 0;
  const dishes = req.body.dishes;

  axios
    .get(`${process.env.TABLE_SERVICE_URL}/table/${req.body.table_number}`)
    .then(({ data }) => {
      if (data.table.status !== 'occupied') {
        return res.status(400).json({
          message: 'Table is not setup',
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: 'Error creating your order',
        error: err.message,
      });
    });

  for (let i in dishes) {
    try {
      const { data } = await axios.get(
        `${process.env.KITCHEN_SERVICE_URL}/dish/${dishes[i].name}`
      );

      if (data.dish.quantity === 0) {
        return res.status(400).json({
          message: 'Dish is out of stock',
        });
      }

      if (data.dish.quantity < dishes[i].quantity) {
        return res.status(400).json({
          message: `${dishes[i].name} is out of stock. Only ${data.dish.quantity} left`,
        });
      }

      orderPrice += data.dish.price * dishes[i].quantity;
      const dishQuantity = data.dish.quantity - dishes[i].quantity;

      await axios.put(
        `${process.env.KITCHEN_SERVICE_URL}/dish/${dishes[i].name}`,
        {
          quantity: dishQuantity,
        }
      );
    } catch (err) {
      return res.status(400).json({
        message: 'Error creating your order',
      });
    }
  }

  axios
    .put(`${process.env.TABLE_SERVICE_URL}/table/${req.body.table_number}`, {
      bill: orderPrice,
    })
    .then(({ data }) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

  axios
    .post(`${process.env.SHIFT_SERVICE_URL}/order`, {...req.body, bill: orderPrice})
    .then(({ data }) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({
        message: 'Error creating your order',
      });
    });
};

export default createOrder;