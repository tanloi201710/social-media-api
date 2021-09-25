import express from 'express';
import { createPost, deletePost, getPost, likePost, timeline, updateComments, updatePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create a post
router.post('/', auth, createPost);

// Update a post
router.patch('/:id', auth, updatePost);

// Update comments
router.patch('/:id/comments', updateComments);

// Delete a post
router.delete('/:id', auth, deletePost);

// Like a post
router.patch('/:id/like', auth, likePost);

// Get a post
router.get('/:id',getPost);

// Get timeline posts
router.get('/timeline/all', auth, timeline);

export default router;