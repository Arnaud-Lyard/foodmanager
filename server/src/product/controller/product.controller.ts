import { NextFunction, Request, Response } from "express";
import { AddProductInput } from "../schema/product.schema";
import { getUserInformations } from "../../utils/getUserInformations";
import AppError from "../../utils/appError";
import { ProductRepository } from "../repository/product.repository";

export const addProductHandler = async (
  req: Request<{}, {}, AddProductInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserInformations(req);
    if (user instanceof AppError) {
      return next(user);
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file!.filename
    }`;

    const product = await ProductRepository.createProduct({
      ...req.body,
      image: imageUrl,
    });

    res.status(200).json({
      status: "success",
    });
  } catch (err: any) {
    next(err);
  }
};
