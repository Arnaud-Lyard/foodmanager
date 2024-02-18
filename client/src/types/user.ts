export interface IUser {
  id: string;
  pseudo: string;
  email: string;
  grade: Grade;
  avatar?: string;
  esl?: string;
  twitter?: string;
  stormgate?: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

type Grade = 'user' | 'player' | 'manager';

type Role = 'user' | 'admin';

export interface ITeamUserResponse {
  teamUsers: IUser[];
  status?: string;
}

export interface ILoggedUserResponse {
  status: string;
  data: {
    isConnect: boolean;
  };
}

export interface IUserResponse {
  status: string;
  data: {
    user: IUser;
  };
}

export interface IUpdateUserResponse {
  status: Status;
  message: string;
}

type Status = 'success' | 'fail';
