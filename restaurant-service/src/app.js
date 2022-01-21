import express from 'express';
import cors from 'cors';
import './database/restaurantDb';
import { restaurantRouter } from './router/restaurantRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(restaurantRouter);

export default app;