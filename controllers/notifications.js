import Notification from '../models/Notification.js';

export const getNotification = async (req,res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ receiver: req.userId }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const addNotification = async (req,res) => {
    const newNotification = new Notification(req.body);
    try {
        await newNotification.save();
        res.status(200).json('Adding notification successfull');
    } catch (error) {
        res.status(500).json(error);
    }
}

export const readNotification = async (req,res) => {
    try {
        const notify = await Notification.findById(req.params.id);
        await notify.updateOne({ seen: true });
        res.status(200).json('Reading notification successfull');
    } catch (error) {
        res.status(500).json(error);
    }
}