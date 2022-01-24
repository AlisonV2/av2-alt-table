import express from 'express';
import cors from 'cors';
import router from './router/router';   
import './database/db';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', router);

export default app;

const port = process.env.ALT_TABLE_PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});