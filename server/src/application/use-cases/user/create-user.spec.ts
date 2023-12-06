import { UserExistsError } from '../../errors/user-exists-error';
import { CreateUserRepository } from '../../ports/repositories/user/create-user-repository';
import { FindUserByEmailRepository } from '../../ports/repositories/user/find-user-by-email-repository';
import { PasswordHashing } from '../../ports/security/password-hashing';
import {
  UserRequestWithPasswordHash,
  UserRequestWithPasswordString,
} from '~/domain/models/user/user-request-required-fields';
import { User } from '~/domain/models/user/user';
import { CreateUser } from './create-user';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';

const sutFactory = () => {
  const userRequestMock = userRequestFactoryWithPassword();
  const createUserRepositoryMock = createUserRepositoryMockFactory();
  const findUserByEmailRepositoryMock = findUserByEmailRepositoryMockFactory();
  const passwordHashingMock = passwordHashingMockFactory();
  const validationMock = validationMockFactory();
  const sut = new CreateUser(
    createUserRepositoryMock,
    findUserByEmailRepositoryMock,
    passwordHashingMock,
    validationMock,
  );

  return {
    sut,
    userRequestMock,
    createUserRepositoryMock,
    findUserByEmailRepositoryMock,
    validationMock,
  };
};

const validationMockFactory = () => {
  class ValidationMock extends ValidationComposite<UserRequestWithPasswordString> {
    async validate(
      _request: UserRequestWithPasswordString,
    ): Promise<void | never> {}
  }

  return new ValidationMock();
};

const passwordHashingMockFactory = () => {
  class PasswordHashingMock implements PasswordHashing {
    async hash(): Promise<string> {
      return 'hash';
    }

    async compare(): Promise<boolean> {
      return true;
    }
  }

  return new PasswordHashingMock();
};

const createUserRepositoryMockFactory = (): CreateUserRepository => {
  class CreateUserRepositoryMock implements CreateUserRepository {
    async create(
      _requestModel: UserRequestWithPasswordHash,
    ): Promise<User | never> {
      return {
        id: '1',
        firstName: 'a_firstName',
        lastName: 'a_lastName',
        email: 'an_email@email.com',
      };
    }
  }

  return new CreateUserRepositoryMock();
};

const findUserByEmailRepositoryMockFactory = () => {
  class FindUserByEmailRepositoryMock implements FindUserByEmailRepository {
    async findByEmail(_email: string): Promise<User | null> {
      return null;
    }
  }

  return new FindUserByEmailRepositoryMock();
};

const userRequestFactoryWithPassword = () => {
  return {
    body: {
      firstName: 'a_firstName',
      lastName: 'a_lastName',
      email: 'an_email@email.com',
      password: 'a_password',
      confirmPassword: 'a_password',
    },
  };
};

const userRequestFactoryWithHash = () => {
  return {
    body: {
      firstName: 'a_firstName',
      lastName: 'a_lastName',
      email: 'an_email@email.com',
      passwordHash: 'hash',
    },
  };
};

const userResponseFactory = () => {
  return {
    id: '1',
    firstName: 'a_firstName',
    lastName: 'a_lastName',
    email: 'an_email@email.com',
  };
};

describe('Create User', () => {
  it('should call user repository with correct values', async () => {
    const { sut, userRequestMock, createUserRepositoryMock } = sutFactory();
    const createUserRepositorySpy = jest.spyOn(
      createUserRepositoryMock,
      'create',
    );

    await sut.create(userRequestMock.body);
    expect(createUserRepositorySpy).toHaveBeenCalledTimes(1);
    expect(createUserRepositorySpy).toHaveBeenCalledWith(
      userRequestFactoryWithHash().body,
    );
  });

  it('should throw if user already exist', async () => {
    const { sut, userRequestMock, findUserByEmailRepositoryMock } =
      sutFactory();
    jest
      .spyOn(findUserByEmailRepositoryMock, 'findByEmail')
      .mockResolvedValue(userResponseFactory());
    return sut.create(userRequestMock.body).catch((error) => {
      return expect(error).toEqual(new UserExistsError('User already created'));
    });
  });

  it('should return user if user is created', async () => {
    const { sut, userRequestMock } = sutFactory();
    const expectedUser = userResponseFactory();
    return sut.create(userRequestMock.body).then((user) => {
      expect(user).toEqual(expectedUser);
    });
  });
});
