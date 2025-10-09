import { Router } from 'express';
import authenticateRequest from '../middleware/authenicateJWT.js';
import upload from '../middleware/multerMiddleware.js';
import { setProfileImage } from '../controllers/profileImageController.js';

const ProfileImageRouter = Router();

ProfileImageRouter.post(
  '/profile-image',
  authenticateRequest,
  upload.single('profileImage'),
  setProfileImage,
);

export default ProfileImageRouter;
