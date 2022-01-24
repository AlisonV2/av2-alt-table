import dotenv from 'dotenv';
import axios from 'axios';
import TableService from '../TableService';
import KitchenService from '../KitchenService';

dotenv.config();

const createOrder = async (req, res) => {
  let orderPrice = 0;
  const dishes = req.body.dishes;

  const tableData = await TableService.getTableByNumber(req.body.table_number);

  if (tableData.table.status !== 'occupied') {
    return res.status(400).json({
      message: 'Table is not setup',
    });
  }

  for (let i in dishes) {
    const dishData = await KitchenService.getDishByName(dishes[i].name);

    if (dishData.dish.quantity === 0) {
      return res.status(400).json({
        message: 'Dish is out of stock',
      });
    }

    if (dishData.dish.quantity < dishes[i].quantity) {
      return res.status(400).json({
        message: `${dishes[i].name} is out of stock. Only ${dishData.dish.quantity} left`,
      });
    }

    orderPrice += data.dish.price * dishes[i].quantity;
    const dishQuantity = data.dish.quantity - dishes[i].quantity;

    await KitchenService.updateDishQuantity(dishes[i].name, dishQuantity);
  }

  await TableService.updateCurrentBill(req.body.table_number, orderPrice);

  axios
    .post(`${process.env.SHIFT_SERVICE_URL}/order`, {
      ...req.body,
      bill: orderPrice,
    })
    .then(({ data }) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({
        message: 'Error creating your order',
        error: err.message
      });
    });
};
export default createOrder;
