import express from 'express';
import { createMessage, getMessages } from '../controllers/messages.js';

import auth from '../middleware/auth.js';

const router = express.Router();

// Add new messages
router.post('/', auth,  createMessage);

// Get messages
router.get('/:id', getMessages);

export default router;