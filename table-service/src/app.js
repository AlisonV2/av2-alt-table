import express from 'express';
import cors from 'cors';
import './database/tableDb';
import { tableRouter } from './router/tableRouter'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(tableRouter)

export default app;