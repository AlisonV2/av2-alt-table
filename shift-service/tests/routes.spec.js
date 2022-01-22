import request from 'supertest';
import app from '../src/app';
import { setupDb, shift2, shift3 } from './fixtures/shiftDb';
import Shift from '../src/models/ShiftModel';

beforeEach(setupDb);

describe('Testing Shift routes', () => {
  test('Should create a new Shift', async () => {
    const response = await request(app)
      .post('/')
      .send(shift3)
      .expect(201);

    const shift = await Shift.findById(response.body.shift._id);
    expect(shift).not.toBeNull();
  });

  test('Should not allow duplicated shift_id', () => {
    return request(app)
      .post('/')
      .send(shift2)
      .expect(400);
  })

  test('Should get shift by shift_id', async () => {
    const response = await request(app).get(`/${shift2.shift_id}`).expect(200);
    expect(response.body.shift.started_at).toBe(shift2.started_at);
    expect(response.body.shift.shift_id).toBe(shift2.shift_id);
  })
});
