import { Post } from '@prisma/client';
import { IUserSafe } from '../../types/user';
import { PostRepository } from '../repository/post.repository';
import fs from 'fs-extra';
import { IpostSafe } from '../../types/post';

export async function createPost({
  file,
  title,
  category,
  content,
  user,
}: {
  file: Express.Multer.File | undefined;
  title: string;
  category: string;
  content: string;
  user: IUserSafe;
}) {
  const fileUpload = file!.filename;
  const fileName = `${process.env.SERVER_URL}/uploads/${fileUpload}`;
  await PostRepository.createPost({ fileName, title, category, content, user });
}

export async function getPostsByUserId(userId: string) {
  return await PostRepository.getPostsByUserId(userId);
}

export async function getPostById(id: string) {
  return await PostRepository.getPostById(id);
}

export async function updatePost({
  id,
  file,
  title,
  category,
  content,
  user,
}: {
  id: string;
  file: Express.Multer.File | undefined;
  title: string;
  category: string;
  content: string;
  user: IUserSafe;
}) {
  const fileUpload = file;
  const postRegistered = await PostRepository.getPostById(id);
  await removeUnusedFiles({ fileUpload, postRegistered });
  const imageUrl = (await getPostImage({
    postRegistered,
    fileUpload,
  })) as string;
  await PostRepository.updatePost({
    id,
    imageUrl,
    title,
    category,
    content,
  });
}

async function removeUnusedFiles({
  fileUpload,
  postRegistered,
}: {
  fileUpload: Express.Multer.File | undefined;
  postRegistered: IpostSafe | null;
}) {
  if (!fileUpload) return;
  const fileToRemoveName = postRegistered?.image?.split('/uploads/')[1];
  await fs.unlink(`public/uploads/${fileToRemoveName}`);
}

async function getPostImage({
  postRegistered,
  fileUpload,
}: {
  postRegistered: IpostSafe | null;
  fileUpload: Express.Multer.File | undefined;
}): Promise<string> {
  if (!fileUpload) return postRegistered!.image;
  return `${process.env.SERVER_URL}/uploads/${fileUpload.filename}`;
}

export async function getAllPosts() {
  return await PostRepository.getAllPosts();
}
