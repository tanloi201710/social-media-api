

import mongoose from "mongoose";
import Comment from "../models/Comment.js";
import Google from "../models/Google.js";
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

export const deletePost = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        const comments = await Comment.find({ postId: req.params.id });
        if(post.userId === req.userId){
            await post.deleteOne();
            await comments.forEach(comment => {
                comment.deleteOne();
            });
            return res.status(200).json("The post has been deleted!")
        } else {
            return res.status(403).json("You can delete only your post!");
        }
    } catch (error) {
        return res.status(500).json(error);
        console.log(error);
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

export const getPosts = async(req,res) => {
    try {
        const userPosts = await Post.find({ userId: req.params.id}).sort({ createdAt: -1 });
        res.status(200).json(userPosts);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getCurrentUser = async (userId) => {
    try {
        const googleUser = await Google.findById(userId)
        if(googleUser) {
            return googleUser;
        } else {
            const user = await User.findById(userId);
            return user;
        }
    } catch (error) {
        console.log(error);
    }
}

export const timeline = async (req,res) => {
    try {
        const currentUser = await getCurrentUser(req.userId);
        const userPosts = await Post.find({ userId: req.userId }).sort({ createdAt: -1 });
        if(currentUser?.followings.length > 0 ) {
            const friendPosts = await Promise.all(
                currentUser.followings.map((friendId) => {
                    return Post.find({ userId: friendId });
                    // .sort({ createdAt: -1 })
                })
            );
            const timelineList = userPosts.concat(...friendPosts);
            timelineList.sort((a,b) => a.createdAt > b.createdAt ? -1 : 1);
            return res.status(200).json(timelineList);
        } else {
            return res.status(200).json(userPosts);
        }
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
};