import express from 'express';
import cors from 'cors';
import { docsRouter } from './router/docsRouter';
const app = express();

app.use(express.json());
app.use(cors());
app.use(docsRouter);

export default app;
