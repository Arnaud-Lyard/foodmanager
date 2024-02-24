import { Status } from './auth';

export interface IPost {
  id: string;
  title: string;
  category: string;
  image: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    pseudo: string;
    avatar: string;
  };
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

export interface IGetAllPostsResponse {
  posts: IPost[];
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
