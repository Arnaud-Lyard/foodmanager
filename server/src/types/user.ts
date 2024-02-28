import { GradeEnumType, RoleEnumType } from '@prisma/client';

export interface IUserSafe {
  id: string;
  stormgateWorldId: string | null;
  pseudo: string;
  email: string;
  grade: GradeEnumType;
  avatar?: string | null;
  esl?: string | null;
  twitter?: string | null;
  role?: RoleEnumType | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserPublic
  extends Omit<IUserSafe, 'email' | 'role' | 'stormgateWorldId'> {}

export type IRoleType = 'admin' | 'user';

export interface IUserInformations {
  role: RoleEnumType | null;
  pseudo: string;
  avatar: string | null;
}
