import { Status } from './user';

export interface IPost {
  id: string;
  title: string;
  category: string;
  image: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPostUser extends IPost {
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
  post: IPostUser;
  status: Status;
}

export interface IGetAllPostsResponse {
  posts: IPostUser[];
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
