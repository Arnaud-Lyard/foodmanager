/* eslint-disable @typescript-eslint/no-explicit-any */
import { RepositoryError } from '../../../../../application/errors/repository-error';
import { CreateUserRepository } from '../../../../../application/ports/repositories/user/create-user-repository';
import { DeleteUserByIdRepository } from '../../../../../application/ports/repositories/user/delete-user-by-id-repository';
import { FindAllUsersRepository } from '../../../../../application/ports/repositories/user/find-all-users-repository';
import { FindUserByEmailRepository } from '../../../../../application/ports/repositories/user/find-user-by-email-repository';
import { FindUserByIdRepository } from '../../../../../application/ports/repositories/user/find-user-by-id-repository';
import { FindOneUserWithRoles } from '../../../../../application/ports/repositories/user/find-user-with-roles-repository';
import { UpdateUserRepository } from '../../../../../application/ports/repositories/user/update-user-repository';
import { User } from '../../../../../domain/models/user/user';
import { UserRequestPartialFields } from '../../../../../domain/models/user/user-request-partial-fields';
import { UserRequestWithPasswordHash } from '../../../../../domain/models/user/user-request-required-fields';
import db from '../../../../../infrastructure/prisma/connection';
import { mapUserFields } from '../helpers/map-user-fields';

export class UserSqlRepository
  implements
    FindUserByIdRepository,
    CreateUserRepository,
    FindUserByEmailRepository,
    DeleteUserByIdRepository,
    UpdateUserRepository,
    FindAllUsersRepository,
    FindOneUserWithRoles
{
  async findById(id: string): Promise<User | null> {
    const user = await db.user.findFirst({
      where: { id },
    });
    if (!user) return null;
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await db.user.findFirst({
      where: { email },
    });
    if (!user) return null;
    return user;
  }

  async create(
    requestModel: UserRequestWithPasswordHash,
  ): Promise<User | never> {
    try {
      const user = await db.user.create({
        data: requestModel,
      });
      return user;
    } catch (error: any) {
      const repositoryError = new RepositoryError('Could not create User');
      repositoryError.stack = error.stack;
      throw repositoryError;
    }
  }

  async deleteById(id: string): Promise<number> {
    try {
      const [result] = await db.$transaction([
        db.user.findMany({
          where: { id },
        }),
        db.user.deleteMany({
          where: { id },
        }),
      ]);
      return result.length;
    } catch (error: any) {
      const repositoryError = new RepositoryError('Could not delete User');
      repositoryError.stack = error.stack;
      throw repositoryError;
    }
  }

  async update(
    id: string,
    requestModel: UserRequestPartialFields,
  ): Promise<number> {
    try {
      const isEmptyObject = Object.keys(requestModel).length === 0;
      if (isEmptyObject) {
        const repositoryError = new RepositoryError('Could not create User');
        throw repositoryError;
      }
      const [result] = await db.$transaction([
        db.user.findMany({
          where: { id },
        }),
        db.user.updateMany({
          where: { id },
          data: requestModel,
        }),
      ]);
      return result.length;
    } catch (error: any) {
      const repositoryError = new RepositoryError('Could not create User');
      repositoryError.stack = error.stack;
      throw repositoryError;
    }
  }

  async find(
    order: 'asc' | 'desc',
    limit: number,
    offset: number,
  ): Promise<User[]> {
    const users = await db.user.findMany({
      orderBy: { id: order },
      take: limit,
      skip: offset,
    });
    return users;
  }

  async findOneWithRoles(id: string): Promise<User | null> {
    const user = await db.user.findFirst({
      where: { id },
      include: { userRole: { include: { role: true } } },
    });
    if (!user) return null;
    return mapUserFields(user);
  }
}
