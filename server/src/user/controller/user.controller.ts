import { NextFunction, Request, Response } from 'express';
import fs from 'fs-extra';
import AppError from '../../utils/appError';
import { getUserInformations } from '../../utils/getUserInformations';
import { UserRepository } from '../repository/user.repository';
import { getTeamUsers, updateUser } from '../service/user.service';
import { UpdateUserInput } from '../schema/user.schema';

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
      status: 'success',
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
      return next(new AppError(400, 'Please upload a file'));
    }

    const fileName = user.avatar?.split('/uploads/')[1];

    if (fileName) {
      try {
        await fs.unlink(`public/uploads/${fileName}`);
      } catch (err: any) {
        next(err);
      }
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${
      file.filename
    }`;

    await UserRepository.saveUserImage({
      userId: user.id,
      imageUrl,
    });

    res.status(200).json({
      status: 'success',
    });
  } catch (err: any) {
    next(err);
  }
};

export const getTeamUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const teamUsers = await getTeamUsers();
    if (teamUsers instanceof AppError) {
      return next(teamUsers);
    }

    res.status(200).json({
      status: 'success',
      teamUsers,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let access_token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }

    res.status(200).json({
      status: 'success',
      data: {
        isConnect: Boolean(access_token),
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateUserHandler = async (
  req: Request<{}, {}, UpdateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserInformations(req);
    if (user instanceof AppError) {
      return next(user);
    }

    if (!req.body.email || !req.body.pseudo) {
      return next(
        new AppError(400, `L'adresse email et le pseudo sont requis`)
      );
    }

    const file = req.file;
    const { twitter, esl, pseudo, email } = req.body;

    await updateUser({
      req,
      user,
      twitter,
      esl,
      pseudo,
      email,
      file,
    });

    res.status(200).json({
      status: 'success',
    });
  } catch (err: any) {
    next(err);
  }
};
