import { User } from "@prisma/client";
import { Request } from "express";
import { findUniqueUser } from "../user/service/user.service";
import AppError from "../utils/appError";
import { verifyJwt } from "../utils/jwt";

export const getUserInformations = async (
  req: Request
): Promise<User | AppError> => {
  try {
    let access_token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      access_token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }

    if (!access_token) {
      return new AppError(401, "You are not logged in");
    }

    // Validate the access token
    const decoded = verifyJwt<{ sub: string }>(access_token);

    if (!decoded) {
      return new AppError(401, `Invalid token or user doesn't exist`);
    }

    // Check if the user still exist
    const user = await findUniqueUser(decoded.sub);

    if (!user) {
      return new AppError(401, `Invalid token or session has expired`);
    }

    return user;
  } catch (err: any) {
    console.error(err);
    return new AppError(401, `Invalid token or session has expired`);
  }
};
