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

  static async getPostsByUserId(userId: string) {
    return await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        image: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        userId,
      },
    });
  }

  static async getPostById(id: string) {
    return await prisma.post.findUnique({
      select: {
        id: true,
        title: true,
        category: true,
        image: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            pseudo: true,
            avatar: true,
          },
        },
      },

      where: {
        id,
      },
    });
  }

  static async updatePost({
    id,
    title,
    category,
    content,
    imageUrl,
  }: {
    id: string;
    title: string;
    category: string;
    content: string;
    imageUrl: string;
  }) {
    return await prisma.post.update({
      data: {
        title,
        category,
        content,
        image: imageUrl,
      },
      where: {
        id,
      },
    });
  }

  static async getAllPosts() {
    return await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        image: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            pseudo: true,
            avatar: true,
          },
        },
      },
    });
  }
}
