import Order from '../models/OrderModel';

const createOrder = async (req, res) => {
  console.log(req.body)
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

export { createOrder };
