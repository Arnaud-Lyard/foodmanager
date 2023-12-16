import { User } from '../../../../../domain/models/user/user';
import { Prisma } from '@prisma/client';
import { Role } from '../../../../../domain/models/role/role';

export type UserWithRolesPayload = Prisma.UserGetPayload<{
  include: { userRole: { include: { role: true } } };
}>;

export function mapUserRoleFields(user: UserWithRolesPayload): User {
  const { id, firstName, lastName, email, passwordHash } = user;
  const roles: Role[] = [];
  for (const userRole of user.userRole) {
    const { id, name, description } = userRole.role;
    roles.push({ id, name, description });
  }
  return {
    id,
    firstName,
    lastName,
    email,
    passwordHash,
    roles: roles,
  };
}
