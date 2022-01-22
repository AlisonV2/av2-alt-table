import request from 'supertest';
import app from '../src/app';
import { setupDb, dish3, dish4 } from './fixtures/kitchenDb';
import Dish from '../src/models/DishModel';

beforeEach(setupDb);

describe('Testing DishRoutes', () => {
  test('Should return a newly created Dish', async () => {
    const response = await request(app)
      .post('/dish')
      .send({ ...dish4 })
      .expect(201);

    const dish = await Dish.findById(response.body.dish._id);
    expect(dish).not.toBeNull();

    expect(response.body.dish).toMatchObject({
      ...dish4
    });

    expect(response.body.message).toBe('Dish created successfully');
  });

  test('Should update dish quantity', async () => {
    await request(app)
      .put(`/dish/${dish3.name}`)
      .send({ quantity: 10 })
      .expect(200);

    const response = await request(app).get(`/dish/${dish3.name}`).expect(200);
    expect(response.body.dish.quantity).toBe(10);
  });

  test('Should return an error message', async () => {
    const response = await request(app)
      .put('/dish/1234')
      .send({ quantity: 10 })
      .expect(400);
    expect(response.body.message).toBe('Error updating dish');
  });

  test('Should get all dishes', async () => {
    const response = await request(app).get('/dish').expect(200);
    expect(response.body.dishes.length).toBe(3);
  });
});

describe('Testing MenuRoutes', () => {
  test('Should get all dishes, except the ones with quantity = 0', async () => {
    const response = await request(app).get('/').expect(200);
    expect(response.body.dishes.length).toBe(2);
  });
});