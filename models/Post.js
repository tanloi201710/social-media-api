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
    comments: {
        type: Array,
        default: []
    }
},
    {timestamps: true}
);

export default mongoose.model('Post', PostSchema);