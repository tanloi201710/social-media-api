import User from '../models/User.js';
import bcrypt from 'bcrypt-nodejs';

export const updateUser = async (req,res) => {
    if(req.userId === req.params.id || req.body.isAdmin){
        if(req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10,function (err, salt) {
                    if (err) {
                        return next(err);
                    }
                });
                req.body.password = await bcrypt.hash(req.body.password, salt, null, function (err,hash) { 
                    if(err) {
                        return next(err);
                    }
                    req.body.password = hash;
                    next();
                 });
            } catch (error) {
                return res.status(500).json(error);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json("You can update only your account!");
    }
};

export const deleteUser = async (req,res) => {
    if(req.userId === req.params.id || req.body.isAdmin){
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted!");
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
};

export const getUser = async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        // filtering some value unnecessary
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const follow = async (req,res) => {
    if(req.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.userId);

            if(!user.followers.includes(req.userId)){
                await user.updateOne({ $push: { followers: req.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json("User has been followed!");
            } else {
                res.status(403).json("You allready follow this user!");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json("You can't follow yourself!");
    }
};

export const unfollow = async (req,res) => {
    if(req.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.userId);

            if(user.followers.includes(req.userId)){
                await user.updateOne({ $pull: { followers: req.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json("User has been unfollowed!");
            } else {
                res.status(403).json("You don't follow this user before!");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json("You can't unfollow yourself!");
    }
};