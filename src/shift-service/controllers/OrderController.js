import Order from '../models/OrderModel';
import formatPrice from '../../helpers/formatPrice';
import Table from '../../table-service/models/TableModel';
import Dish from '../../kitchen-service/models/DishModel';

const createOrder = async (req, res) => {
  let orderPrice = 0;
  const dishes = req.body.dishes;

  try {
    const tableData = await Table.findOne({
      table_number: req.body.table_number,
    });

    if (tableData.status !== 'occupied') {
      return res.status(400).json({
        message: 'Table has not been setup yet',
      });
    }

    for (let i in dishes) {
      const dishData = await Dish.findOne({ name: dishes[i].name });

      if (dishData.quantity === 0) {
        return res.status(400).json({
          message: 'Dish is out of stock',
        });
      }

      if (dishData.quantity < dishes[i].quantity) {
        return res.status(400).json({
          message: `${dishes[i].name} is out of stock. Only ${dishData.quantity} left`,
        });
      }

      orderPrice += dishData.price * dishes[i].quantity;
      const dishQuantity = dishData.quantity - dishes[i].quantity;

      dishData.quantity = dishQuantity;
      await dishData.save();
    }

    const table = await Table.findOne({
      table_number: req.body.table_number,
    });

    console.log(table)
    table.current_bill += orderPrice;
    table.save((err, newTable) => {
      if (err) {
        return res.status(400).json({
          message: 'Error updating current bill',
        });
      } 
    });

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
      } 
      
      res.status(201).json({
        message: 'Order created successfully',
        order: newOrder,
      });
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

      await Order.findByIdAndUpdate(
        orders[i]._id,
        {
          bill_paid: true,
        },
        { useFindAndModify: false, new: false }
      );
    }

    const table = await Table.findOne({
      table_number: req.body.table_number,
    });

    if (table.status !== 'occupied') {
      res.status(400).json({
        message: 'Table is not occupied',
      });
      return;
    }

    table.status = 'available';
    table.customers = 0;
    table.current_bill = 0;
    table.meal_state = 'not-started';
    table.save((err, newTable) => {
      if (err) {
        return res.status(400).json({
          message: 'Error checking out table',
        });
      }
      res.status(200).json({
        message: 'Checkout successful',
        bill: formatPrice(totalBill),
        dishes: dishes,
        table: newTable
      });
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error checking out',
    });
  }
};
export { createOrder, checkOut };
