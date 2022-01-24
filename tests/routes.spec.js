import request from 'supertest';
import app from '../src/app';
import { setupDb, dish3, dish4 } from './fixtures/dbSetup';
import Dish from '../src/kitchen-service/models/DishModel';
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
    await request(app)
      .put('/dish/whatever')
      .send({ quantity: 10 })
      .expect(404);
  });

  test('Should get all dishes', async () => {
    const response = await request(app).get('/api/dish').expect(200);
    expect(response.body.dishes.length).toBe(3);
  });
});

describe('Testing MenuRoutes', () => {
  test('Should get all dishes, except the ones with quantity = 0', async () => {
    const response = await request(app).get('/api/menu').expect(200);
    expect(response.body.dishes.length).toBe(2);
  });
});
