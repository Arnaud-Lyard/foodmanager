import { User } from '../../../../../domain/models/user/user';
export type UserWithRoles = User & {
  id: string;
  name: string;
  description: string;
};
