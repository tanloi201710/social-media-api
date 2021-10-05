import express from 'express';
import { createConv, getConv } from '../controllers/conversations.js';

import auth from '../middleware/auth.js';

const router = express.Router();

// Create a new conversation
router.post('/', auth,  createConv);

// Get a conversation of a user
router.get('/:id', getConv);

export default router;