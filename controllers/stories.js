import Story from "../models/Story.js";
import User from "../models/User.js";

export const getStory = async (req,res) => {
    try {
        const story = await Story.findById(req.params.id);
        res.status(200).json(story);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const timelineStory = async (req,res) => {
    try {
        const currentUser = await User.findById(req.userId);
        const userStorys = await Story.findById(currentUser._id);
        const friendStorys = Promise.all(
            currentUser.followings.map((friendId) => {
                return Story.find({ author: friendId });
            })
        );
        return res.status(200).json(userStorys.concat(...friendStorys));
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const createStory = async (req,res) => {
    const story = req.body;

    const newStory = new Story({ ...story, author: req.userId });
    try {
        await newStory.save();

        res.status(200).json(newStory);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteStory = async (req,res) => {
    try {
        const story = await Story.findById(req.params.id);
        if(story.author === req.userId){
            await story.deleteOne();
            return res.status(200).json("The story has been deleted!")
        } else {
            return res.status(403).json("You can delete only your story!");
        }
    } catch (error) {
        
    }
};