import express from 'express';
import cors from 'cors';
import './database/menuDb';
import { restaurantRouter } from './router/restaurantRouter'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/api/', restaurantRouter)

export default app;