import request from 'supertest';
import app from '../src/app';
import {
  setupDb,
  dish3,
  dish4,
  shift2,
  table4,
  seatingPlan1,
} from './fixtures/dbSetup';
import Dish from '../src/kitchen-service/models/DishModel';
import Table from '../src/table-service/models/TableModel';

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
      .send({ ...dish3 })
      .expect(400);

    expect(response.body.message).toBe('Error creating dish');
  });

  test('Should update dish quantity', async () => {
    await request(app)
      .put('/api/dish')
      .send({ name: dish3.name, quantity: 10 })
      .expect(200);
  });

  test('Should throw an error if dish name is not found while updating', async () => {
    await request(app).put('/dish/whatever').send({ quantity: 10 }).expect(404);
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
      shift_id: shift2.shift_id,
      table_number: 2,
      customers: 2,
    });
    expect(response.status).toBe(200);
    expect(response.body.table.status).toBe('occupied');
  });

  test('Should return an error as customers are > seats', async () => {
    const response = await request(app).put('/api/table').send({
      shift_id: shift2.shift_id,
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
    expect(response.status).toBe(404);
  });

  test('Should reset the table', async () => {
    await request(app)
      .post('/api/checkout')
      .send({
        shift_id: shift2.shift_id,
        table_number: 1,
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
      .send({
        shift_id: '12-18-1895-dinner',
        tables: [table4],
      })
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
    expect(response.status).toBe(404);
  });
});
