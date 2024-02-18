import express from 'express';
import { authenticateUser } from '../../middleware/authenticateUser';
import { uploadFile } from '../../middleware/uploadFile';
import {
  getMeHandler,
  getTeamUsersHandler,
  getUserHandler,
  updateUserHandler,
  uploadUserImageHandler,
} from '../controller/user.controller';

const router = express.Router();

router.get('/', authenticateUser, getUserHandler);

router.post('/upload', authenticateUser, uploadFile, uploadUserImageHandler);

router.get('/team', getTeamUsersHandler);

router.get('/me', getMeHandler);

router.post('/update', authenticateUser, uploadFile, updateUserHandler);

export default router;
