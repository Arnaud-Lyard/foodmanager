import {
  ICreatePostResponse,
  IGetAllPostsResponse,
  IGetPostResponse,
  IGetPostUserResponse,
  IUpdatePostResponse,
} from '../types/post';
import { HttpService } from './http.service';

const API_URL = import.meta.env.VITE_SERVER_API_URL;

export class PostService extends HttpService {
  constructor() {
    super(API_URL);
  }

  async create(formData: FormData) {
    const { data } = await this.instance.post<ICreatePostResponse>(
      `api/posts`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  }

  async getMyPosts() {
    const { data } = await this.instance.get<IGetPostUserResponse>(
      `api/posts/owner`
    );
    return data;
  }

  async getPost(id: string) {
    const { data } = await this.instance.get<IGetPostResponse>(
      `api/posts/${id}`
    );
    return data;
  }

  async update(formData: FormData, id: string) {
    const { data } = await this.instance.patch<IUpdatePostResponse>(
      `api/posts/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  }

  async getAllPosts() {
    const { data } = await this.instance.get<IGetAllPostsResponse>(`api/posts`);
    return data;
  }
}

export const postService = new PostService();
