import express from 'express';
import cors from 'cors';
import './database/kitchenDb';
import { kitchenRouter } from './router/kitchenRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(kitchenRouter);

export default app;
