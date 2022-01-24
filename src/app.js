import express from 'express';
import cors from 'cors';
import { tableRouter } from './routers/tableRouter';
import { kitchenRouter } from './routers/kitchenRouter';
import { shiftRouter } from './routers/shiftRouter';
import { docsRouter } from './routers/docsRouter';

import './database/db';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', tableRouter);
app.use('/api', kitchenRouter);
app.use('/api', shiftRouter);
app.use('/api', docsRouter)

export default app;
