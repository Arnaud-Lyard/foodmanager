import { ICreatePostResponse } from '../types/post';
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
}

export const postService = new PostService();
