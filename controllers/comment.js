import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
    const newComment = new Comment(req.body);
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.id }).sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getReplies = async (req,res) => {
    try {
        const replies = await Comment.find({ root: req.params.id }).sort({ createdAt: -1 });
        res.status(200).json(replies);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const updateComment = async (req,res) => {

}

export const likeComment = async(req,res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if(!comment.likes.includes(req.userId)){
            await comment.updateOne({ $push: { likes: req.userId } });
            return res.status(200).json("The comment has been liked!");
        } else {
            await comment.updateOne({$pull: { likes: req.userId } });
            return res.status(200).json("You unlike this post!");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}