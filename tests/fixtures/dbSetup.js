
import Shift from '../../src/models/ShiftModel';
import Table from '../../src/models/TableModel';
import Order from '../../src/models/OrderModel';
import Dish from '../../src/models/DishModel';
import SeatingPlan from '../../src/models/SeatingPlanModel';
import Rating from '../../src/models/RatingModel';

import { shift1, shift2, shift3 } from './shift';
import { table1, table2, table3 } from './table';
import { dish1, dish2, dish3 } from './dish';
import {order1, order2, order3 } from './order';
import { seatingPlan1, seatingPlan2, seatingPlan3 } from './seating-plan';
import { rating1, rating2, rating3 } from './rating'

const setupDb = async () => {
  await Table.deleteMany();
  await Table.insertMany([table1, table2, table3]);
  await SeatingPlan.deleteMany();
  await SeatingPlan.insertMany([seatingPlan1, seatingPlan2, seatingPlan3]);
  await Dish.deleteMany();
  await Dish.insertMany([dish1, dish2, dish3]);
  await Shift.deleteMany();
  await Shift.insertMany([shift1, shift2, shift3]);
  await Order.deleteMany();
  await Order.insertMany([order1, order2, order3]);
  await Rating.deleteMany();
  await Rating.insertMany([rating1, rating2, rating3]);
};

export default setupDb;