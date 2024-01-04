import { NextFunction, Request, Response } from "express";
import { getUserInformations } from "../../utils/getUserInformations";
import AppError from "../../utils/appError";
import { UserRepository } from "../repository/user.repository";

export const getUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserInformations(req);
    if (user instanceof AppError) {
      return next(user);
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const uploadUserImageHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserInformations(req);
    if (user instanceof AppError) {
      return next(user);
    }

    const file = req.file;
    if (!file) {
      return next(new AppError(400, "Please upload a file"));
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      file.filename
    }`;

    await UserRepository.saveUserImage({
      userId: user.id,
      imageUrl,
    });

    res.status(200).json({
      status: "success",
    });
  } catch (err: any) {
    next(err);
  }
};
