import mongoose from 'mongoose';

const GoogleSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        default: 'male'
    },
    job: {
        type: String
    },
    profilePicture: {
        type: String,
        default: '',
    },
    profilePictureName: {
        type: String,
        default: '',
    },
    coverPicture: {
        type: String,
        default: '',
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    desc: {
        type: String,
        max: 50,
    },
    city: {
        type: String,
        max: 50,
    },
    from: {
        type: String,
        max: 50,
    },
    relationship: {
        type: Number,
        enum: [1,2,3],
    },
    birthday: {
        type: String,
    }
},
    {timestamps: true}
);

export default mongoose.model('Google', GoogleSchema);