import Order from '../models/OrderModel';
import formatPrice from '../helpers/formatPrice';

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
        res.status(201).json({
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

const getOrdersByTableNumber = async (req, res) => {
  let dishesOrdered = [];
  try {
    const orders = await Order.find({
      shift_id: req.body.shift_id,
      table_number: req.params.table_number,
    });

    if (orders.length === 0) {
      return res.status(400).json({
        message: 'No order found',
      });
    }

    for (let i in orders) {
      dishesOrdered = [...dishesOrdered, ...orders[i].dishes];
    }

    res.status(200).json({
      message: `Dishes ordered by table number ${req.params.table_number}`,
      orders: dishesOrdered,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error getting orders',
    });
  }
};

const checkOut = async (req, res) => {
  console.log(req.body);
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

    console.log(orders)

    for (let i in orders) {
      totalBill += orders[i].bill;
      dishes = [...dishes, ...orders[i].dishes];

      await Order.findByIdAndUpdate(
        orders[i]._id,
        {
          bill_paid: true,
        },
        { useFindAndModify: false, new: false }
      );
    }

    console.log(totalBill)

    res.status(200).json({
      message: 'Checkout successful',
      bill: formatPrice(totalBill),
      dishes: dishes,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error checking out',
    });
  }
};
export { createOrder, checkOut, getOrdersByTableNumber };
