import express from "express";
import { authenticateUser } from "../../middleware/authenticateUser";
import { getPlayersHandler } from "../controller/player.controller";

const router = express.Router();

router.get("/", getPlayersHandler);

export default router;
