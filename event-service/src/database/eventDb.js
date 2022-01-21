import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(process.env.EVENT_DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to EventDB'))
    .catch((err) => console.log(err));
