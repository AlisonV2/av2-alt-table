import Order from '../models/OrderModel';
import formatPrice from '../helpers/formatPrice';
import { checkOutTable} from '../controllers/TableController';

const createOrder = async (req, res) => {
  try {
    const order = new Order({
      shift_id: req.body.shift_id,
      table_number: req.body.table_number,
      dishes: req.body.dishes,
    });
    order.save((err, newOrder) => {
      if (err) {
        res.status(400).json({
          message: 'Error creating order',
          error: err.message,
        });
      } else {
        res.status(200).json({
          message: 'Order created successfully',
          order: newOrder,
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error creating order',
    });
  }
};

const checkOut = async (req, res) => {
  let totalBill = req.body.tip ?? 0;
  let dishes = [];
  try {
    const orders = await Order.find({ 
      shift_id: req.body.shift_id,
      table_number: req.body.table_number,
      bill_paid: false,
    });

    if (orders.length === 0) {
      return res.status(400).json({
        message: 'No order found',
      });
    }

    for (let i in orders) {
      totalBill += orders[i].bill;
      dishes = [...dishes, ...orders[i].dishes];

      await Order.findByIdAndUpdate(orders[i]._id, {
        bill_paid: true,
      });
    }

    await checkOutTable(req.body.table_number);

    res.status(200).json({
      message: 'Checkout successful',
      bill: formatPrice(totalBill),
      dishes: dishes
    });

  } catch (err) {
    res.status(400).json({
      message: 'Error checking out',
    });
  }
};
export { createOrder, checkOut };
