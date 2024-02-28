export interface IUser {
  id: string;
  stormgateWorldId: string;
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

export type Role = 'user' | 'admin';

export interface ITeamUserResponse {
  teamUsers: IUser[];
  status?: string;
}

export interface ILoggedUserResponse {
  status: string;
  data: {
    isConnect: boolean;
    informations: {
      role: Role;
      pseudo: string;
      avatar: string;
    };
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

export type Status = 'success' | 'fail';
