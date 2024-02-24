import express from 'express';
import { authenticateAdmin } from '../../middleware/authenticateAdmin';
import { uploadFile } from '../../middleware/uploadFile';
import {
  createPostHandler,
  getAllPostsHandler,
  getPostHandler,
  getPostUserHandler,
  updatePostHandler,
} from '../controller/post.controller';

const router = express.Router();

router.post('/', authenticateAdmin, uploadFile, createPostHandler);

router.get('/owner', authenticateAdmin, getPostUserHandler);

router.get('/:id', getPostHandler);

router.patch('/:id', authenticateAdmin, uploadFile, updatePostHandler);

router.get('/', getAllPostsHandler);

export default router;
