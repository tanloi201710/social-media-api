

import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req,res) => {
    const  post = req.body;

    const newPost = new Post({ ...post, userId: req.userId });
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const updatePost = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.userId){
            const updatedPost = await post.updateOne({ $set: req.body });
            return res.status(200).json(updatedPost);
        } else {
            return res.status(403).json("You can update only your post!");
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const updateComments = async(req,res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id, 
            { $set: { comment: req.body } }, 
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deletePost = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.userId){
            await post.deleteOne();
            return res.status(200).json("The post has been deleted!")
        } else {
            return res.status(403).json("You can delete only your post!");
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const likePost = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.userId)){
            await post.updateOne({ $push: { likes: req.userId } });
            return res.status(200).json("The post has been liked!");
        } else {
            await post.updateOne({$pull: { likes: req.userId } });
            return res.status(200).json("You unlike this post!");
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const getPost = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const timeline = async (req,res) => {
    try {
        // const currentUser = await User.findById(req.userId);
        const userPosts = await Post.find({ userId: req.userId }).sort( { createdAt: -1 } );
        // const friendPosts = await Promise.all(
        //     currentUser.followings.map((friendId) => {
        //         return Post.find({ userId: friendId });
        //     })
        // );
        return res.status(200).json(userPosts);  //.concat(...friendPosts)
    } catch (error) {
        return res.status(500).json(error);
    }
};