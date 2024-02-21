import { NextFunction, Request, Response } from 'express';
import { getUserInformations } from '../../utils/getUserInformations';
import AppError from '../../utils/appError';
import { createPostInput } from '../schema/post.schema';
import { createPost } from '../service/post.service';
import { IUserSafe } from '../../types/user';

export const createPostHandler = async (
  req: Request<{}, {}, createPostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await getUserInformations(req, next)) as IUserSafe;

    if (!req.body.title || !req.body.title || !req.body.content) {
      return next(
        new AppError(
          400,
          "Le titre, la catégorie, l'image et le contenu sont requis"
        )
      );
    }

    const file = req.file;
    const { title, category, content } = req.body;

    await createPost({ file, title, category, content, user });

    res.status(200).json({
      status: 'success',
    });
  } catch (err: any) {
    next(err);
  }
};
