import express from "express";
import { authenticateUser } from "../../middleware/authenticateUser";
import { uploadFile } from "../../middleware/uploadFile";
import {
  getTeamUsersHandler,
  getUserHandler,
  uploadUserImageHandler,
} from "../controller/user.controller";

const router = express.Router();

router.get("/", authenticateUser, getUserHandler);

router.post("/upload", authenticateUser, uploadFile, uploadUserImageHandler);

router.get("/team", getTeamUsersHandler);

export default router;
