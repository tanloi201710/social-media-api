import express from 'express';
import { updateUser, deleteUser, getUser, follow, unfollow, updateGoogle } from '../controllers/users.js';
import auth from '../middleware/auth.js';

const router = express.Router();

//Update user
router.put("/:id", auth, updateUser);
//Delete user
router.delete("/:id", auth,deleteUser);
//Get a user
router.get("/:id",getUser);
//Follow a user
router.put("/:id/follow", auth, follow);
//Unfollow a user
router.put("/:id/unfollow", auth, unfollow);

export default router;