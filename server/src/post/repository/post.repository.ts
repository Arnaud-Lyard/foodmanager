import prisma from '../../../prisma/client';
import { IUserSafe } from '../../types/user';
export class PostRepository {
  static async createPost({
    fileName,
    title,
    category,
    content,
    user,
  }: {
    fileName: string;
    title: string;
    category: string;
    content: string;
    user: IUserSafe;
  }) {
    return await prisma.post.create({
      data: {
        title,
        category,
        content,
        image: fileName,
        userId: user.id,
      },
    });
  }
}
