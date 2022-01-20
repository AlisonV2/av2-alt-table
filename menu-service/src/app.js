import express from 'express';
import cors from 'cors';
import './database/menuDb';
import { menuRouter } from './router/menuRouter'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(menuRouter)

export default app;