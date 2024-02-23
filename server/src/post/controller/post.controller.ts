import { NextFunction, Request, Response } from 'express';
import { getUserInformations } from '../../utils/getUserInformations';
import AppError from '../../utils/appError';
import { UpdatePostInput, CreatePostInput } from '../schema/post.schema';
import {
  createPost,
  getPostById,
  getPostsByUserId,
  updatePost,
} from '../service/post.service';
import { IUserSafe } from '../../types/user';

export const createPostHandler = async (
  req: Request<{}, {}, CreatePostInput>,
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

export const getPostUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await getUserInformations(req, next)) as IUserSafe;

    const posts = await getPostsByUserId(user.id);

    res.status(200).json({
      posts,
      status: 'success',
    });
  } catch (err: any) {
    next(err);
  }
};

export const getPostHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const post = await getPostById(id);

    res.status(200).json({
      post,
      status: 'success',
    });
  } catch (err: any) {
    next(err);
  }
};

export const updatePostHandler = async (
  req: Request<
    UpdatePostInput['params'],
    Record<string, never>,
    UpdatePostInput['body']
  >,
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
    const { id } = req.params;

    await updatePost({ file, title, category, content, user, id });

    res.status(200).json({
      status: 'success',
    });
  } catch (err: any) {
    next(err);
  }
};
