import dotenv from 'dotenv';
import axios from 'axios';
import checkDuplicatedTables from '../helpers/checkDuplicatedTables';
import checkNegativeNumbers from '../helpers/checkNegativeNumbers';


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
    res.status(200).json({
      message: 'Seating plan updated successfully',
      data: data.seatingPlan,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error updating Seating plan',
    });
  }
};

const getSeatingPlanByShiftId = async (req, res) => {
  try {
    const { data } = await axios.get(
      `${process.env.TABLE_SERVICE_URL}/seating-plan/${req.params.shift_id}`
    );
    res.status(200).json({
      message: 'Seating plan fetched successfully',
      seatingPlan: data,
    });
  } catch (err) {
    res.status(400).json({
      message: 'No seating plan found',
    });
  }
};

const installCustomers = async (req, res) => {
  const { shift } = await axios.get(
    `${process.env.SHIFT_SERVICE_URL}/${req.body.shift_id}`
  );
  if (!shift) {
    res.status(400).json({
      message: 'Shift has not been started yet',
    });
    return;
  }

  try {
    const { data } = await axios.put(
      `${process.env.TABLE_SERVICE_URL}/tables`,
      req.body
    );
    res.status(200).json({
      message: 'Table installed successfully',
      table: data,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error installing customers',
    });
  }
};

const createOrder = async (req, res) => {
  let orderPrice = 0;
  const dishes = req.body.dishes;

  for (let i in dishes) {

    if (dishes[i].quantity < 0) {
      res.status(400).json({
        message: 'Please provide a valid quantity',
      });
      return;
    }

    const { data } = await axios.get(
      `${process.env.KITCHEN_SERVICE_URL}/${dishes[i].name}`
    );

    orderPrice += data.price * dishes[i].quantity;

    if (data.quantity < dishes[i].quantity) {
      res.status(400).json({
        message: `${dishes[i].name} is out of stock. Only ${data.quantity} left`,
      });
      return;
    }
  }
  try {
    const { data } = await axios.post(
      `${process.env.TABLE_SERVICE_URL}/order`,
      req.body
    );

    await axios.put(`${process.env.TABLE_SERVICE_URL}/bill`, {
      table_number: req.body.table_number,
      bill: orderPrice,
    });

    res.status(200).json({
      message: 'Order created successfully',
      order: data,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error creating order',
    });
  }
};

export {
  createSeatingPlan,
  updateSeatingPlan,
  getSeatingPlanByShiftId,
  installCustomers,
  createOrder,
};
