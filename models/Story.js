import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Story', storySchema);