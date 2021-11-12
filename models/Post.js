import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        max: 500,
    },
    img: {
        type: Array,
        default: []
    },
    imgName: {
        type: Array,
        default: []
    },
    likes: {
        type: Array,
        default: [],
    },
        /* Commments
        img: {String}
        name: {String}
        message: {String}
        likes: {Array}
        replies: {Array},
        root: {String}
        createdAt: {timestamps}
        */
    feeling: {
        type: String,
        default: ''
    },
    tag: {
        type: Array,
    }
},
    {timestamps: true}
);

export default mongoose.model('Post', PostSchema);