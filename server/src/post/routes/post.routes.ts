import express from 'express';
import { authenticateUser } from '../../middleware/authenticateUser';
import { uploadFile } from '../../middleware/uploadFile';
import {
  createPostHandler,
  getAllPostsHandler,
  getPostHandler,
  getPostUserHandler,
  updatePostHandler,
} from '../controller/post.controller';

const router = express.Router();

router.post('/', authenticateUser, uploadFile, createPostHandler);

router.get('/owner', authenticateUser, getPostUserHandler);

router.get('/:id', getPostHandler);

router.patch('/:id', authenticateUser, uploadFile, updatePostHandler);

router.get('/', getAllPostsHandler);

export default router;
