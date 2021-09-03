import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import multer from 'multer';

import { __dirname } from './constants.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import postRoute from './routes/posts.js';
import storyRoute from './routes/stories.js';


const app = express();

dotenv.config();
const PORT = process.env.PORT;
const DB_URL = process.env.MONGODB_CONNECT;

// conect to DB
mongoose.connect(DB_URL, 
    { useNewUrlParser : true, useUnifiedTopology: true }, 
    () => {
    console.log('Connected to MongoDB!');
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

console.log(__dirname);
//middleware
app.use(express.json({ limit: '50mb' }));
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

//Upload images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploaded successfully");
    } catch (error) {
      console.error(error);
    }
});

//Routes

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/story',storyRoute);

app.listen(PORT, () => {
    console.log(`Backend is up and running on port ${PORT} !`);
});