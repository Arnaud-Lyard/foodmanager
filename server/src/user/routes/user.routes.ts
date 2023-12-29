import express from "express";
import { getUserHandler } from "../controller/user.controller";
import { deserializeUser } from "../../middleware/deserializeUser";

const router = express.Router();

// router.use(deserializeUser);

router.get("/", getUserHandler);

export default router;
