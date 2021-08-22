import express from 'express';
import { createStory, deleteStory, getStory, timelineStory } from '../controllers/stories.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get a story
router.get('/:id', getStory);

// Get timeline storys
router.get('/timeline/all', timelineStory);

// Create a story
router.post('/', auth, createStory);

// Delete a story
router.delete('/:id', auth, deleteStory);

export default router;