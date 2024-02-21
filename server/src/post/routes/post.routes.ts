import express from 'express';
import { authenticateUser } from '../../middleware/authenticateUser';
import { uploadFile } from '../../middleware/uploadFile';
import { createPostHandler } from '../controller/post.controller';

const router = express.Router();

router.post('/', authenticateUser, uploadFile, createPostHandler);

export default router;
