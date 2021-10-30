import express from 'express';
import { createPost, deletePost, getPost, getPosts, likePost, timeline, updatePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create a post
router.post('/', auth, createPost);

// Update a post
router.patch('/:id', auth, updatePost);


// Delete a post
router.delete('/:id', auth, deletePost);

// Like a post
router.patch('/:id/like', auth, likePost);

//Get posts
router.get('/:id/many', getPosts);

// Get a post
router.get('/:id/one',getPost);

// Get timeline posts
router.get('/timeline/all', auth, timeline);

export default router;