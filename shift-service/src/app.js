import express from 'express';
import cors from 'cors';
import './database/shiftDb';
import { seatingPlanRouter } from './router/seatingPlanRouter';
import { shiftRouter } from './router/shiftRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(seatingPlanRouter);
app.use(shiftRouter);

export default app;
