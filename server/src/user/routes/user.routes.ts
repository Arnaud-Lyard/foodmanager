import express from "express";
import { authenticateUser } from "../../middleware/authenticateUser";
import { uploadFile } from "../../middleware/uploadFile";
import {
  getUserHandler,
  uploadUserImageHandler,
} from "../controller/user.controller";

const router = express.Router();

router.use(authenticateUser);

router.get("/", getUserHandler);

router.post("/upload", uploadFile, uploadUserImageHandler);

export default router;
