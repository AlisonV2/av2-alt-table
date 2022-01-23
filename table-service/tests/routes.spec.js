import request from 'supertest';
import app from '../src/app';
import { setupDb, table2, table4, seatingPlan1 } from './fixtures/tableDb';

beforeEach(setupDb);

describe('Testing Table routes', () => {
  test('Should return all tables', async () => {
    const response = await request(app).get('/table');
    expect(response.status).toBe(200);
    expect(response.body.tables.length).toBe(3);
  });

  test('Should create tables', async () => {
    const response = await request(app).post('/table').send([table4]);
    expect(response.status).toBe(200);
    expect(response.body.tables.length).toBe(1);
  });

  test('Should return an error if table_number is already set', async () => {
    const response = await request(app).post('/table').send([table2]);
    expect(response.status).toBe(400);
  });

  test('Should return an error if body is not defined', async () => {
    const response = await request(app).post('/table').send();
    expect(response.status).toBe(400);
  });

  test('Table status should be occupied', async () => {
    const response = await request(app).put(`/table`).send({
      table_number: 2,
      customers: 2,
    });
    expect(response.status).toBe(200);
    expect(response.body.table.status).toBe('occupied');
  });

  test('Should return an error as customers are > seats', async () => {
    const response = await request(app).put('/table').send({
      table_number: 1,
      customers: 6,
    });
    expect(response.status).toBe(400);
  });

  test('Should return an error as body is empty', async () => {
    const response = await request(app).put('/table').send();
    expect(response.status).toBe(400);
  });

  test('Should return the proper table', async () => {
    const response = await request(app).get('/table/1').expect(200);
    expect(response.body.table.current_bill).toBe(18.99);
  });

  test('Should throw an error as table_number is wrong', async () => {
    const response = await request(app).get('/table/158');
    expect(response.status).toBe(404);
  });

  test('Should update the current bill of the table', async () => {
    const response = await request(app).put('/table/1').send({
      bill: 10,
    });
    expect(response.status).toBe(200);
    expect(response.body.table.current_bill).toBe(28.99);
  });

  test('Should throw an error as body is empty', async () => {
    const response = await request(app).put('/table/1').send();
    expect(response.status).toBe(400);
  });

  test('Should reset the table', async () => {
    await request(app)
      .post('/checkout')
      .send({
        table_number: 1,
      })
      .expect(200);

    const response = await request(app).get('/table/1').expect(200);
    expect(response.body.table.current_bill).toBe(0);
    expect(response.body.table.customers).toBe(0);
    expect(response.body.table.meal_state).toBe('not-started');
    expect(response.body.table.status).toBe('available');
  });

  test('Should throw an error as table is not occupied', async () => {
    await request(app)
      .post('/checkout')
      .send({
        table_number: 2,
      })
      .expect(400);
  });
});

describe('Testing SeatingPlan routes', () => {
  test('Should create a Seating Plan', async () => {
    const response = await request(app)
      .post('/seating-plan')
      .send({
        shift_id: '12-18-1895-dinner',
        tables: [table4],
      })
      .expect(201);
    expect(response.body.seatingPlan).toHaveProperty('shift_id');
  });

  test('Should throw an error if body is not defined', async () => {
    const response = await request(app).post('/seating-plan').send();
    expect(response.status).toBe(400);
  });

  test('Should update a Seating plan', async () => {
    const response = await request(app)
      .put(`/seating-plan/${seatingPlan1.shift_id}`)
      .send({
        shift_id: '25-11-1991-dinner',
        tables: [table4],
      });
    expect(response.status).toBe(200);
  });

  test('Should throw an error when seating plan is not found', async () => {
    const response = await request(app)
      .put('/seating-plan/123')
      .send({
        shift_id: '25-11-1991-dinner',
        tables: [table4],
      });
    expect(response.status).toBe(404);
  });

  test('Should get seating plan by id', async () => {
    const response = await request(app).get(
      `/seating-plan/${seatingPlan1.shift_id}`
    );
    expect(response.status).toBe(200);
    expect(response.body.seatingPlan.shift_id).toBe(seatingPlan1.shift_id);
  });

  test('Should return an error when not found', async () => {
    const response = await request(app).get(`/seating-plan/1234`);
    expect(response.status).toBe(400);
  });
});
