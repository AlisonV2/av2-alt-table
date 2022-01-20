import request from 'supertest';
import app from '../src/app';
import { setupDb } from './fixtures/tableDb';

beforeEach(setupDb);

describe('Testing TableRoutes', () => {
  test('Should return all tables', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.tables.length).toBe(3);
  });
});