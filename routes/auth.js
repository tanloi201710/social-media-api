import express from 'express';
import { register, login, GgAccount } from '../controllers/auth.js';

const router = express.Router();

// Register
router.post('/register', register);
// Login
router.post('/login', login);
// Google Account
router.post('/create', GgAccount);

export default router;