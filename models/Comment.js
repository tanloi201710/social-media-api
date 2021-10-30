import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    postId: {
        type: String,
    },
    img: {
        type: String,
    },
    name: {
        type: String,
    },
    message: {
        type: String,
    },
    likes: {
        type: Array,
    },
    replies: {
        type: Array,
    },
    root: {
        type: String,
    }
},
    {timestamps: true}
);

export default mongoose.model('Comment', CommentSchema);