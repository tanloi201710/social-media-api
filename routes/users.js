import express from 'express';
import { updateUser, deleteUser, getUser, follow, unfollow, getRecommentFriends, getFriends } from '../controllers/users.js';
import auth from '../middleware/auth.js';

const router = express.Router();

//Update user
router.put('/:id', auth, updateUser);

//Delete user
router.delete('/:id', auth,deleteUser);

//Get a user
router.get('/:id/one',getUser);

//Get friends
router.get('/:id/friends', getFriends);

//Get recommentFriends
router.get('/:id/recomments', getRecommentFriends);

//Follow a user
router.put('/:id/follow', auth, follow);

//Unfollow a user
router.put('/:id/unfollow', auth, unfollow);

export default router;