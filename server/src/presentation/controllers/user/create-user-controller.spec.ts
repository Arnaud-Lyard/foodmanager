/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseHandler } from '../../../application/ports/responses/response-handler';
import { ResponseModel } from '../../../application/ports/responses/response-model';
import { CreateUserUseCase } from '../../../domain/use-cases/user/create-user-use-case';
import { User } from '../../../domain/models/user/user';
import { UserRequestWithPasswordString } from '../../../domain/models/user/user-request-required-fields';
import { CreateUserController } from './create-user-controller';

const sutFactory = () => {
  const useCaseMock = useCaseMockFactory();
  const presenterMock = presenterMockFactory();
  const sut = new CreateUserController(useCaseMock, presenterMock);

  return {
    sut,
    useCaseMock,
    presenterMock,
  };
};

const useCaseMockFactory = () => {
  class UseCaseMock implements CreateUserUseCase {
    async create(
      _userData: UserRequestWithPasswordString,
    ): Promise<User> | never {
      return responseDataMockFactory();
    }
  }

  return new UseCaseMock();
};

const presenterMockFactory = () => {
  class PresenterMock implements ResponseHandler<User> {
    async response(_body: any): Promise<ResponseModel<User>> | never {
      return {
        statusCode: 201,
        body: responseDataMockFactory(),
      };
    }
  }

  return new PresenterMock();
};

const responseDataMockFactory = () => {
  return {
    id: '1',
    firstName: 'first1',
    lastName: 'last1',
    email: 'email1@email.com',
    passwordHash: 'hash1',
  };
};

const requestDataMockFactory = () => {
  const response = responseDataMockFactory();

  return {
    body: {
      firstName: response.firstName,
      lastName: response.lastName,
      email: response.email,
      password: '123',
      confirmPassword: '123',
    },
  };
};

describe('CreateUserController', () => {
  it('should throw if request.body does not exist', async () => {
    const { sut } = sutFactory();
    let error;
    try {
      await sut.handleRequest('' as any);
    } catch (requestError: any) {
      error = requestError;
    }
    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Missing body');
    expect(error.statusCode).toBe(400);
  });

  it('should call use case with correct values', async () => {
    const { sut, useCaseMock } = sutFactory();
    const useCaseSpy = jest.spyOn(useCaseMock, 'create');
    await sut.handleRequest(requestDataMockFactory());
    expect(useCaseSpy).toBeCalledTimes(1);
    expect(useCaseSpy).toBeCalledWith(requestDataMockFactory().body);
  });

  it('should call presenter with the use case result', async () => {
    const { sut, presenterMock } = sutFactory();
    const presenterSpy = jest.spyOn(presenterMock, 'response');
    await sut.handleRequest(requestDataMockFactory());
    expect(presenterSpy).toBeCalledTimes(1);
    expect(presenterSpy).toBeCalledWith(responseDataMockFactory());
  });

  it('should return statusCode 201 and body if everything is OK', async () => {
    const { sut } = sutFactory();
    const response = await sut.handleRequest(requestDataMockFactory());
    expect(response).toEqual({
      statusCode: 201,
      body: responseDataMockFactory(),
    });
  });
});
