import { User } from '../../../../../domain/models/user/user';

export function mapUserFields(user: User): User {
  const { id, firstName, lastName, email } = user;
  return {
    id,
    firstName,
    lastName,
    email,
  };
}

export function mapManyUsersFields(users: User[]): User[] {
  return users.map((user) => mapUserFields(user));
}
