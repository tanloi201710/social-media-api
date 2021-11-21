import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
    sender: {
        type: String,
    },
    receiver: {
        type: String,
    },
    action: {
        type: String
    },
    type: {
        type: String,
    },
    seen: {
        type: Boolean,
        default: false,
    },
    waitToken: {
        type: String,
    },
    link: {
        type: String,
    }
},
    {timestamps: true}
);

export default mongoose.model('Notification', NotificationSchema);