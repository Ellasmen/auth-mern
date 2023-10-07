import express from 'express';
import {
    authUser, registerUser,
    LogoutUser,
    getUserProfile,
    updateUserprofile
} from '../controllers/userControllers.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/logout', LogoutUser);
router.post('/auth', authUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserprofile);

export default router;
