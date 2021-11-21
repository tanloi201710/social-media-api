import express from 'express';
import { addNotification, getAllNotifications, getNotification, readNotification } from '../controllers/notifications.js';
import auth from '../middleware/auth.js';



const router = express.Router();

// Add new notification
router.post('/', addNotification);

// Read Notification
router.put('/:id', readNotification);

// Get Notification
router.get('/:id', getNotification);

// Get all notifications
router.get('/', auth, getAllNotifications);

export default router;