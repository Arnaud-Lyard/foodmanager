import { NextFunction, Request, Response } from "express";
import AppError from "../../utils/appError";
import { getAllPlayers } from "../service/player.service";

export const getPlayersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const players = await getAllPlayers();
    if (players instanceof AppError) {
      return next(players);
    }

    res.status(200).json({
      status: "success",
      players,
    });
  } catch (err: any) {
    next(err);
  }
};
