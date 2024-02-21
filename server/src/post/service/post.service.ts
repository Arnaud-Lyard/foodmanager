import { IUserSafe } from '../../types/user';
import { PostRepository } from '../repository/post.repository';

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
