import express from 'express';
import { addComment, getComments, getReplies, likeComment, updateComment } from '../controllers/comment.js';

import auth from '../middleware/auth.js';

const router = express.Router();

// Add a new comment
router.post('/', auth,  addComment);

// Get comments
router.get('/:id', getComments);

// Get replies
router.get('/:id/replies', getReplies);

// Update a commment
router.patch('/:id/update', updateComment);

// Like Comment
router.patch('/:id/like',auth, likeComment);

export default router;