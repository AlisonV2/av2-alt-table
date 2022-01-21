import request from 'supertest';
import app from '../src/app';
import { setupDb, table4, seatingPlan1, seatingPlan2 } from './fixtures/tableDb';

beforeEach(setupDb);

describe('Testing Table routes', () => {
  test('Should return all tables', async () => {
    const response = await request(app).get('/tables');
    expect(response.status).toBe(200);
    expect(response.body.tables.length).toBe(3);
  });

  test('Should create tables', async () => {
    const response = await request(app).post('/tables').send([table4]);
    expect(response.status).toBe(200);
    expect(response.body.tables.length).toBe(1);
  });
});

describe('Testing SeatingPlan routes', () => {
  test('Should create a Seating Plan', async () => {
    const response = await request(app)
      .post('/seating-plan')
      .send({ 
        shift_id: 'djshfqdsjhf',
        tables: [table4]
      })
      .expect(201);
    expect(response.body.seatingPlan).toHaveProperty('shift_id');
  });

  test('Should update a Seating plan', async () => {
    const response = await request(app)
      .put(`/seating-plan/${seatingPlan1._id}`)
      .send({
        shift_id: '25-11-1991-dinner',
        tables: [table4],
      });
    expect(response.status).toBe(200);
  });

  test('Should get seating plan by id', async () => {
    const response = await request(app).get(`/seating-plan/${seatingPlan1._id}`);
    expect(response.status).toBe(200);
    expect(response.body.seatingPlan.shift_id).toBe(seatingPlan1.shift_id);
  });
});
