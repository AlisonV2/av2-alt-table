import request from 'supertest';
import app from '../src/app';
import setupDb from './fixtures/dbSetup';
import { dish1, dish4 } from './fixtures/dish';
import { shift1, shift4 } from './fixtures/shift';
import { order4 } from './fixtures/order';
import { seatingPlan1, seatingPlan4 } from './fixtures/seating-plan';
import { table1, table4 } from './fixtures/table';

import Dish from '../src/models/DishModel';
import Table from '../src/models/TableModel';

beforeEach(setupDb);

describe('Testing Table Service routes', () => {
  test('Create a dish returns a dish', async () => {
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

  test('Create a dish returns an error', async () => {
    const response = await request(app)
      .post('/api/dish')
      .send({ ...dish1 })
      .expect(400);

    expect(response.body.message).toBe('Error creating dish');
  });

  test('Update dish quantity', async () => {
    await request(app)
      .put('/api/dish')
      .send({ name: dish1.name, quantity: 10 })
      .expect(200);
  });

  test('Update dish quantity throw an error if dish is not found', async () => {
    await request(app).put('/api/dish').send({ quantity: 10 }).expect(400);
  });

  test('Get all dishes', async () => {
    const response = await request(app).get('/api/dish').expect(200);
    expect(response.body.dishes.length).toBe(3);
  });
});

describe('Testing Menu Routes', () => {
  test('Get dishes where quantity is not 0', async () => {
    const response = await request(app).get('/api/menu').expect(200);
    expect(response.body.dishes.length).toBe(2);
  });
});

describe('Testing Table routes', () => {
  test('Install customers, table status should be occupied', async () => {
    const response = await request(app).put('/api/table').send({
      shift_id: shift1.shift_id,
      table_number: 2,
      customers: 2,
    });
    expect(response.status).toBe(200);
    const table = await Table.findOne({ table_number: 1 });
    expect(table.status).toBe('occupied');
  });

  test('Install customers, error when customers are more than seats', async () => {
    const response = await request(app).put('/api/table').send({
      shift_id: shift1.shift_id,
      table_number: 1,
      customers: 6,
    });
    expect(response.status).toBe(400);
  });

  test('Install customers, throw an error as shift_id is not defined', async () => {
    const response = await request(app).put('/api/table').send({
      table_number: 1,
      customers: 6,
    });
    expect(response.status).toBe(400);
  });

  test('Install customers, throw an error as shift_id is not found', async () => {
    const response = await request(app).put('/api/table').send({
      shift_id: '123',
      table_number: 1,
      customers: 6,
    });
    expect(response.status).toBe(400);
  });

  test('Install customers, throw an error as table_number is wrong', async () => {
    const response = await request(app).put('/api/table').send({
      table_number: 128,
      customers: 6,
    });
    expect(response.status).toBe(400);
  });

  test('Checkout table, the table should be reset', async () => {
    await request(app)
      .post('/api/checkout')
      .send({
        shift_id: shift1.shift_id,
        table_number: 1,
        tip: 0,
      })
      .expect(200);

    const table = await Table.findOne({ table_number: 1 });
    expect(table.current_bill).toBe(0);
    expect(table.customers).toBe(0);
    expect(table.meal_state).toBe('not-started');
    expect(table.status).toBe('available');
  });

  test('Checkout table should not work in table is not occupied', async () => {
    await request(app)
      .post('/api/checkout')
      .send({
        table_number: 2,
      })
      .expect(400);
  });
});

describe('Testing SeatingPlan routes', () => {
  test('Create a seating plan', async () => {
    const response = await request(app)
      .post('/api/seating-plan')
      .send({ ...seatingPlan4 })
      .expect(201);
    expect(response.body.seatingPlan).toHaveProperty('shift_id');
  });

  test('Should not allow duplicated numbers', async () => {
    await request(app)
      .post('/api/seating-plan')
      .send({
        shift_id: seatingPlan4.shift_id,
        tables: [{ ...table1 }, { ...table1 }],
      })
      .expect(400);
  });

  test('Should not allow negative numbers', async () => {
    await request(app)
      .post('/api/seating-plan')
      .send({
        shift_id: seatingPlan4.shift_id,
        tables: [{ ...table1, seats: -1 }],
      })
      .expect(400);
  });

  test('Update a seating plan', async () => {
    const response = await request(app)
      .put('/api/seating-plan')
      .send({
        shift_id: seatingPlan1.shift_id,
        tables: [table4],
      });
    expect(response.status).toBe(200);
  });

  test('Update a seating plan, should throw an error if seating plan is not found', async () => {
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
  test('Create an order', async () => {
    const response = await request(app)
      .post('/api/order')
      .send({ ...order4 })
      .expect(201);
    expect(response.body.order).toHaveProperty('_id');
  });

  test('Create an order should throw an error if table is not setup', async () => {
    const response = await request(app)
      .post('/api/order')
      .send({
        shift_id: shift1.shift_id,
        table_number: 2,
        dishes: [],
      })
      .expect(400);
    expect(response.body.message).toBe('Table has not been setup yet');
  });

  test('Create an order should throw an error', async () => {
    const response = await request(app).post('/api/order').send().expect(400);
    expect(response.body.message).toBe('Table not found');
  });
});

describe('Testing Shift routes', () => {
  test('Create a new shift after seating plan creation', async () => {
    await request(app)
      .post('/api/shift')
      .send({...shift4})
      .expect(400);

  });

  test('Create a new shift should not allow duplicated shift', async () => {
    const response = await request(app)
      .post('/api/shift')
      .send({ ...shift1 })
      .expect(400);

    expect(response.body.message).toBe('Error creating shift');
  });

  test('Create a new shift should fail is seating_plan is not found', async () => {
    await request(app)
      .post('/api/shift')
      .send({ shift_id: '1554452' })
      .expect(400);
  });

  test('Get the current Shift state', async () => {
    const response = await request(app)
      .get(`/api/shift/${shift1.shift_id}`)
      .expect(200);
    expect(response.body.state[0]).toHaveProperty('dishes');
  });
});

describe('Testing rating routes', () => {
  test('Should create a new rating', async () => {
    const response = await request(app)
      .post('/api/rating')
      .send({
        shift_id: '2022-01-24T10:12:00.005Z',
        dish_name: 'TestDish2',
        score: 5,
        comment: "I'm a comment",
      })
      .expect(201);
    expect(response.body.rating).toHaveProperty('_id');
  });

  test('Create rating should throw an error', async () => {
    const response = await request(app)
      .post('/api/rating')
      .send({
        dish_name: 'TestDish2',
        score: 5,
      })
      .expect(400);
    expect(response.body.message).toBe('Error creating rating');
  });
});
