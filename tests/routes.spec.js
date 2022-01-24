import request from 'supertest';
import app from '../src/app';
import setupDb from './fixtures/dbSetup';
import { dish1, dish4 } from './fixtures/dish';
import { shift1, shift4 } from './fixtures/shift';
import { order1, order4 } from './fixtures/order';
import { seatingPlan1, seatingPlan4 } from './fixtures/seating-plan';
import { rating1, rating4 } from './fixtures/rating';
import { table1, table4 } from './fixtures/table';

import Dish from '../src/models/DishModel';
import Table from '../src/models/TableModel';
import Shift from '../src/models/ShiftModel';

beforeEach(setupDb);

describe('Testing Table Service routes', () => {
  test('Should return a newly created Dish', async () => {
    const response = await request(app)
      .post('/api/dish')
      .send({ ...dish4 })
      .expect(201);

    const dish = await Dish.findById(response.body.dish._id);
    expect(dish).not.toBeNull();

    expect(response.body.dish).toMatchObject({
      ...dish4,
    });

    expect(response.body.message).toBe('Dish created successfully');
  });

  test('Should throw an error if it cannot create a new dish', async () => {
    const response = await request(app)
      .post('/api/dish')
      .send({ ...dish1 })
      .expect(400);

    expect(response.body.message).toBe('Error creating dish');
  });

  test('Should update dish quantity', async () => {
    await request(app)
      .put('/api/dish')
      .send({ name: dish1.name, quantity: 10 })
      .expect(200);
  });

  test('Should throw an error if dish name is not found while updating', async () => {
    await request(app).put('/api/dish').send({ quantity: 10 }).expect(400);
  });

  test('Should get all dishes', async () => {
    const response = await request(app).get('/api/dish').expect(200);
    expect(response.body.dishes.length).toBe(3);
  });
});

describe('Testing Menu Routes', () => {
  test('Should get all dishes, except the ones with quantity = 0', async () => {
    const response = await request(app).get('/api/menu').expect(200);
    expect(response.body.dishes.length).toBe(2);
  });
});

describe('Testing Table routes', () => {
  test('Table status should be occupied', async () => {
    const response = await request(app).put('/api/table').send({
      shift_id: shift1.shift_id,
      table_number: 2,
      customers: 2,
    });
    expect(response.status).toBe(200);
    const table = await Table.findOne({ table_number: 1 });
    expect(table.status).toBe('occupied');
  });

  test('Should return an error as customers are > seats', async () => {
    const response = await request(app).put('/api/table').send({
      shift_id: shift1.shift_id,
      table_number: 1,
      customers: 6,
    });
    expect(response.status).toBe(400);
  });

  test('Should throw an error as shift_id is not defined', async () => {
    const response = await request(app).put('/api/table').send({
      table_number: 1,
      customers: 6,
    });
    expect(response.status).toBe(400);
  });

  test('Should reset the table', async () => {
    await request(app)
      .post('/api/checkout')
      .send({
        shift_id: shift1.shift_id,
        table_number: 1,
        tip: 0
      })
      .expect(200);

    const table = await Table.findOne({ table_number: 1 });
    expect(table.current_bill).toBe(0);
    expect(table.customers).toBe(0);
    expect(table.meal_state).toBe('not-started');
    expect(table.status).toBe('available');
  });

  test('Should throw an error as table is not occupied', async () => {
    await request(app)
      .post('/api/checkout')
      .send({
        table_number: 2,
      })
      .expect(400);
  });
});

describe('Testing SeatingPlan routes', () => {
  test('Should create a Seating Plan', async () => {
    const response = await request(app)
      .post('/api/seating-plan')
      .send({ ...seatingPlan4 })
      .expect(201);
    expect(response.body.seatingPlan).toHaveProperty('shift_id');
  });

  test('Should update a Seating plan', async () => {
    const response = await request(app)
      .put('/api/seating-plan')
      .send({
        shift_id: seatingPlan1.shift_id,
        tables: [table4],
      });
    expect(response.status).toBe(200);
  });

  test('Should throw an error when seating plan is not found', async () => {
    const response = await request(app)
      .put('/api/seating-plan')
      .send({
        shift_id: '123',
        tables: [table4],
      });
    expect(response.status).toBe(400);
  });
});

describe('Testing Order routes', () => {
  test('Should create an order', async () => {
    const response = await request(app)
      .post('/api/order')
      .send({ ...order4 })
      .expect(201);
    expect(response.body.order).toHaveProperty('_id');
  });
});

describe('Testing Shift routes', () => {
  test('Should create a new Shift', async () => {
    const response = await request(app)
      .post('/api/shift')
      .send({ ...shift4 })
      .expect(201);

    const shift = await Shift.findById(response.body.shift._id);
    expect(shift).not.toBeNull();
  });
});
