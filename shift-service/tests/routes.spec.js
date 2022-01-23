import request from 'supertest';
import app from '../src/app';
import { setupDb, shift2, shift3, order1 } from './fixtures/shiftDb';
import Shift from '../src/models/ShiftModel';

beforeEach(setupDb);

describe('Testing Shift routes', () => {
  test('Should create a new Shift', async () => {
    const response = await request(app).post('/shift').send(shift3).expect(201);

    const shift = await Shift.findById(response.body.shift._id);
    expect(shift).not.toBeNull();
  });

  test('Should not allow duplicated shift_id', () => {
    return request(app).post('/shift').send(shift2).expect(400);
  });

  test('Should get shift by shift_id', async () => {
    const response = await request(app).get(`/shift/${shift2.shift_id}`).expect(200);
    expect(response.body.shift.started_at).toBe(shift2.started_at);
    expect(response.body.shift.shift_id).toBe(shift2.shift_id);
  });
});

describe('Testing Order routes', () => {
  test('Should create an order', async () => {
    const response = await request(app)
      .post('/order')
      .send({
        table_number: 1,
        shift_id: 'what-ever',
        dishes: [
          {
            name: 'Dish1',
            price: 10,
          },
        ],
      })
      .expect(201);
    expect(response.body.order).toHaveProperty('_id');
  });

  test('Should get orders by table number', async () => {
    const response = await request(app)
      .post('/order/1')
      .send({
        shift_id: '25-11-1996-dinner',
      })
      .expect(200);
    expect(response.body.orders.length).toBe(1);
  });

  test('Should return an error when shift_id is wrong', async () => {
    await request(app)
      .post('/order/1')
      .send({
        shift_id: '1234',
      })
      .expect(400);
  });

  test('Should return an error when table_number is wrong', async () => {
    await request(app)
      .post('/order/12')
      .send({
        shift_id: '25-11-1996-dinner',
      })
      .expect(400);
  });
});
