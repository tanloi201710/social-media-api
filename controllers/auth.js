import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export const register = async (req,res) => {
    const { email, password, name } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({ message: "User already exists!" })
        
        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // create new user
        const user = await User.create({ email, password: hashedPassword, name });
        // create token
        const token = jwt.sign({email: user.email, id: user._id }, SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({ result: user, token });
    } catch (error) {
        res.status(500).json(error);
    };
};

export const login = async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        !user && res.status(404).json("user not found!");

        const validPassword = await bcrypt.compare(password, user.password);
        !validPassword && res.status(400).json("Wrong password!");

        const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({ result: user, token });
    } catch (error) {
        res.status(500).json(error);
    }
};