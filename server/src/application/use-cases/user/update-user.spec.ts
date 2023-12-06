/* eslint-disable @typescript-eslint/no-explicit-any */
import { FindUserByEmailRepository } from '../../ports/repositories/user/find-user-by-email-repository';
import { FindUserByIdRepository } from '../../ports/repositories/user/find-user-by-id-repository';
import { UpdateUserRepository } from '../../ports/repositories/user/update-user-repository';
import { PasswordHashing } from '../../ports/security/password-hashing';
import { UserRequestPartialFields } from '~/domain/models/user/user-request-partial-fields';
import { User } from '../../../domain/models/user/user';
import { UpdateUser } from './update-user';
import { ValidationComposite } from '../../ports/validation/validation-composite';

const sutFactory = () => {
  const findUserByIdRepositoryMock = findUserByIdRepositoryMockFactory();
  const updateUserRepositoryMock = updateUserRepositoryMockFactory();
  const findUserByEmailRepositoryMock = findUserByEmailRepositoryMockFactory();
  const passwordHashingMock = passwordHashingMockFactory();
  const validationMock = validationMockFactory();
  const sut = new UpdateUser(
    updateUserRepositoryMock,
    findUserByIdRepositoryMock,
    findUserByEmailRepositoryMock,
    passwordHashingMock,
    validationMock,
  );

  return {
    sut,
    updateUserRepositoryMock,
    findUserByIdRepositoryMock,
    findUserByEmailRepositoryMock,
    passwordHashingMock,
    validationMock,
  };
};

const validationMockFactory = () => {
  class ValidationMock extends ValidationComposite<UserRequestPartialFields> {
    async validate(_request: UserRequestPartialFields): Promise<void | never> {}
  }

  return new ValidationMock();
};

const findUserByIdRepositoryMockFactory = () => {
  class FindUserByIdRepositoryMock implements FindUserByIdRepository {
    async findById(_id: string): Promise<User | null> {
      return {
        id: '1',
        email: 'email@email.com',
        firstName: 'firstName',
        lastName: 'lastName',
        passwordHash: 'any_hash',
      };
    }
  }

  return new FindUserByIdRepositoryMock();
};

const findUserByEmailRepositoryMockFactory = () => {
  class FindUserByEmailRepositoryMock implements FindUserByEmailRepository {
    async findByEmail(_email: string): Promise<User | null> {
      return null;
    }
  }

  return new FindUserByEmailRepositoryMock();
};

const passwordHashingMockFactory = () => {
  class PasswordHashingMock implements PasswordHashing {
    async hash(_string: string) {
      return 'hashed';
    }

    async compare(_string: string, _hash: string) {
      return true;
    }
  }

  return new PasswordHashingMock();
};

const updateUserRepositoryMockFactory = () => {
  class UpdateUserRepositoryMock implements UpdateUserRepository {
    async update(
      _id: string,
      _requestModel: UserRequestPartialFields,
    ): Promise<number | never> {
      return 1;
    }
  }

  return new UpdateUserRepositoryMock();
};

describe('UpdateUser', () => {
  it('should call findUserByIdRepository with correct values', async () => {
    const { sut, findUserByIdRepositoryMock } = sutFactory();
    const findUserByIdRepositorySpy = jest.spyOn(
      findUserByIdRepositoryMock,
      'findById',
    );
    await sut.update('1', { firstName: 'new_firstName' });
    expect(findUserByIdRepositorySpy).toHaveBeenCalledTimes(1);
    expect(findUserByIdRepositorySpy).toHaveBeenCalledWith('1');
  });

  it('should throw if findUserByIdRepository throws', async () => {
    const { sut, findUserByIdRepositoryMock } = sutFactory();
    jest
      .spyOn(findUserByIdRepositoryMock, 'findById')
      .mockRejectedValueOnce(new Error('Any Error'));

    let error;

    try {
      await sut.update('1', { firstName: 'new_firstName' });
    } catch (e: any) {
      error = e;
    }

    expect(error.name).toBe('Error');
    expect(error.message).toBe('Any Error');
  });

  it('should throw if user do not exist', async () => {
    const { sut, findUserByIdRepositoryMock } = sutFactory();
    jest.spyOn(findUserByIdRepositoryMock, 'findById').mockResolvedValue(null);
    let error;

    try {
      await sut.update('1', { firstName: 'new_firstName' });
    } catch (e: any) {
      error = e;
    }

    expect(error.name).toBe('NotFoundError');
    expect(error.message).toBe('User does not exist');
  });

  it('should call updateUserRepository with correct values', async () => {
    const { sut, updateUserRepositoryMock } = sutFactory();
    const updateUserRepositorySpy = jest.spyOn(
      updateUserRepositoryMock,
      'update',
    );
    await sut.update('1', { firstName: 'new_firstName' });
    expect(updateUserRepositorySpy).toHaveBeenCalledTimes(1);
    expect(updateUserRepositorySpy).toHaveBeenCalledWith('1', {
      firstName: 'new_firstName',
    });
  });

  it('should throw if updateUserRepository throws', async () => {
    const { sut, updateUserRepositoryMock } = sutFactory();
    jest
      .spyOn(updateUserRepositoryMock, 'update')
      .mockRejectedValueOnce(new Error('Any Error'));

    let error;

    try {
      await sut.update('1', { firstName: 'new_firstName' });
    } catch (e: any) {
      error = e;
    }

    expect(error.name).toBe('Error');
    expect(error.message).toBe('Any Error');
  });

  it('should return number of rows updated if everything is OK', async () => {
    const { sut, updateUserRepositoryMock } = sutFactory();
    jest.spyOn(updateUserRepositoryMock, 'update').mockResolvedValue(1);
    const response = await sut.update('1', { firstName: 'any_value' });
    expect(response).toBe(1);
  });

  it('should hash password if password is received', async () => {
    const { sut, updateUserRepositoryMock, passwordHashingMock } = sutFactory();
    const updateUserRepositorySpy = jest.spyOn(
      updateUserRepositoryMock,
      'update',
    );
    const passwordHashingSpy = jest
      .spyOn(passwordHashingMock, 'hash')
      .mockResolvedValueOnce('hashed');

    await sut.update('1', { password: 'password' });

    expect(passwordHashingSpy).toBeCalledTimes(1);
    expect(passwordHashingSpy).toHaveBeenCalledWith('password');

    expect(updateUserRepositorySpy).toBeCalledTimes(1);
    expect(updateUserRepositorySpy).toHaveBeenCalledWith('1', {
      passwordHash: 'hashed',
    });
  });

  it('should call findUserByEmailRepository with correct values', async () => {
    const { sut, findUserByEmailRepositoryMock } = sutFactory();
    const findUserByEmailRepositorySpy = jest.spyOn(
      findUserByEmailRepositoryMock,
      'findByEmail',
    );
    await sut.update('1', {
      firstName: 'new_firstName',
      email: 'any_email@email.com',
    });
    expect(findUserByEmailRepositorySpy).toHaveBeenCalledTimes(1);
    expect(findUserByEmailRepositorySpy).toHaveBeenCalledWith(
      'any_email@email.com',
    );
  });

  it('should throw if email is found', async () => {
    const { sut, findUserByEmailRepositoryMock } = sutFactory();
    jest
      .spyOn(findUserByEmailRepositoryMock, 'findByEmail')
      .mockResolvedValueOnce({
        id: '1',
        email: 'email@email.com',
        firstName: 'first',
        lastName: 'last',
        passwordHash: 'any_hash',
      });

    let error;

    try {
      await sut.update('1', {
        firstName: 'new_firstName',
        email: 'email@email.com',
      });
    } catch (e: any) {
      error = e;
    }

    expect(error.name).toBe('EmailValidationError');
    expect(error.statusCode).toBe(400);
  });

  it('should throw user not updated', async () => {
    const { sut, updateUserRepositoryMock } = sutFactory();
    jest.spyOn(updateUserRepositoryMock, 'update').mockResolvedValueOnce(0);

    let error;

    try {
      await sut.update('1', {
        firstName: 'new_firstName',
        email: 'email@email.com',
      });
    } catch (e: any) {
      error = e;
    }

    expect(error.name).toBe('RepositoryError');
    expect(error.statusCode).toBe(500);
  });
});
