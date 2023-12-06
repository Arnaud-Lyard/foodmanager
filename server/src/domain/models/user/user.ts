import { Role } from '../role/role';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash?: string;
  roles?: Role[];
}
