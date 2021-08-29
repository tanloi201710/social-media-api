import express from 'express';
import multer from 'multer';
import { fileUpload } from '../controllers/upload.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"public/images");
    },
    filename: (req,file,cb) => {
        cb(null,req.body.name);
    }
});

const upload = multer({ storage });

router.post("/", upload.single("file"), fileUpload);

export default router;