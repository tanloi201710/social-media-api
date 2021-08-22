import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const auth = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodeData;

        if(token && isCustomAuth) {
            // Custom Authentication
            decodeData = jwt.verify(token, SECRET_KEY);
            req.userId = decodeData?.id;
        } else {
            // Google Authentication
            decodeData = jwt.decode(token);
            req.userId = decodeData?.sub;
        }
        next();
    } catch (error) {
        console.log(error);
    }
};
export default auth;