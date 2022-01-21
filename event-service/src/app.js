import express from 'express';
import cors from 'cors';
import './database/eventDb';
import { eventsRouter } from './router/eventsRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(eventsRouter);

export default app;