import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(process.env.MENU_DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MenuDB'))
    .catch((err) => console.log(err));
