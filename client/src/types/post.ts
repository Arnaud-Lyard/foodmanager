import { Status } from './auth';

export interface ICreatePostResponse {
  status: Status;
  message?: string;
  errors: [
    {
      message: string;
    }
  ];
}
