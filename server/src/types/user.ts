import { GradeEnumType, RoleEnumType } from '@prisma/client';

export interface IUserSafe {
  id: string;
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
