import { Status } from './auth';

export interface IPost {
  id: string;
  title: string;
  category: string;
  image: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreatePostResponse {
  status: Status;
  message?: string;
  errors: [
    {
      message: string;
    }
  ];
}

export interface IGetPostUserResponse {
  posts: IPost[];
  status: Status;
}

export interface IGetPostResponse {
  post: IPost;
  status: Status;
}

export interface IUpdatePostResponse {
  status: Status;
  message?: string;
  errors: [
    {
      message: string;
    }
  ];
}
