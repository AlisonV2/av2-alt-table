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
      ...dish4,
    });

    expect(response.body.message).toBe('Dish created successfully');
  });

  test('Should throw an error if it cannot create a new dish', async () => {
    const response = await request(app)
      
      .post('/dish')
      .send({ ...dish3 })
      .expect(400);
      
    expect(response.body.message).toBe('Error creating dish');
  });

  test('Should get dish by name', async () => {
    const response = await request(app)
      .get(`/dish/${dish3.name}`)
      .expect(200);

    expect(response.body.dish.name).toBe(dish3.name);
    expect(response.body.dish.price).toBe(dish3.price);
  })

  test('Should update dish quantity', async () => {
    await request(app)
      .put(`/dish/${dish3.name}`)
      .send({ quantity: 10 })
      .expect(200);

    const response = await request(app).get(`/dish/${dish3.name}`).expect(200);
    expect(response.body.dish.quantity).toBe(10);
  });

  test('Should throw an error if dish name is not found while updating', async () => {
    await request(app)
      .put('/dish/whatever')
      .send({ quantity: 10 })
      .expect(404);
  });

  test('Should throw an error if dish name is not found', async () => {
    await request(app)
      .get('/dish/whatever')
      .expect(404);
  });

  test('Should return an error message if quantity is not a number', async () => {
    const response = await request(app)
      .put(`/dish/${dish3.name}`)
      .send({ quantity: ''})
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
    const response = await request(app).get('/menu').expect(200);
    expect(response.body.dishes.length).toBe(2);
  });
});

describe('Testing Rating routes', () => {
  test('Should create a new rating', async () => {
    const response = await request(app)
      .post(`/rating/${dish3.name}`)
      .send({
        comment: 'Whatever',
        score: 5,
      })
      .expect(201);

    expect(response.body.message).toBe('Successfully added a rating');
  });

  test('Should throw an error', async () => {
    await request(app)
      .post('/rating/Dish1254')
      .send()
      .expect(500);
  });
});
