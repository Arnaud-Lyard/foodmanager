import { NextFunction, Request, Response } from "express";
import { authenticateUser } from "../../utils/authenticateUser";
import AppError from "../../utils/appError";

export const getUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authenticateUser(req);
    if (user instanceof AppError) {
      return next(user);
    }

    res.status(200).status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
