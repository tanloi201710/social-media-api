import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import postRoute from './routes/posts.js';
import storyRoute from './routes/stories.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT;
const DB_URL = process.env.MONGODB_CONNECT;

mongoose.connect(DB_URL, 
    { useNewUrlParser : true, useUnifiedTopology: true }, 
    () => {
    console.log('Connected to MongoDB!');
});

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/story',storyRoute);

app.listen(PORT, () => {
    console.log(`Backend is up and running on port ${PORT} !`);
});