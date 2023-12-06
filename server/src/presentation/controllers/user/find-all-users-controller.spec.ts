/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseHandler } from '../../../application/ports/responses/response-handler';
import { User } from '../../../domain/models/user/user';
import { FindAllUsersUseCase } from '../../../domain/use-cases/user/find-all-users-use-case';
import { FindAllUsersController } from './find-all-users-controller';

const sutFactory = () => {
  const useCaseMock = useCaseMockFactory();
  const presenterMock = presenterMockFactory();
  const sut = new FindAllUsersController(useCaseMock, presenterMock);

  return {
    sut,
    useCaseMock,
    presenterMock,
  };
};

const userDataMockFactory = () => {
  return [
    {
      id: '1',
      firstName: 'first1',
      lastName: 'last1',
      email: 'email1@email.com',
      passwordHash: 'hash1',
    },
    {
      id: '2',
      firstName: 'first2',
      lastName: 'last2',
      email: 'email2@email.com',
      passwordHash: 'hash2',
    },
    {
      id: '3',
      firstName: 'first3',
      lastName: 'last3',
      email: 'email3@email.com',
      passwordHash: 'hash3',
    },
    {
      id: '4',
      firstName: 'first4',
      lastName: 'last4',
      email: 'email4@email.com',
      passwordHash: 'hash4',
    },
    {
      id: '5',
      firstName: 'first5',
      lastName: 'last5',
      email: 'email5@email.com',
      passwordHash: 'hash5',
    },
  ];
};

const useCaseMockFactory = () => {
  class UseCaseMock implements FindAllUsersUseCase {
    async findAll(_args: any): Promise<User[]> {
      return userDataMockFactory();
    }
  }

  return new UseCaseMock();
};

const presenterMockFactory = () => {
  class PresenterMock implements ResponseHandler<User[]> {
    async response(_body: any) {
      return {
        statusCode: 200,
        body: userDataMockFactory(),
      };
    }
  }

  return new PresenterMock();
};

describe('FindAllUsersController', () => {
  it('should call use case with correct values', async () => {
    const { sut, useCaseMock } = sutFactory();
    const useCaseSpy = jest.spyOn(useCaseMock, 'findAll');
    await sut.handleRequest({ query: { order: 'asc', limit: 10, offset: 2 } });
    expect(useCaseSpy).toBeCalledTimes(1);
    expect(useCaseSpy).toBeCalledWith({ order: 'asc', limit: 10, offset: 2 });
  });

  it('should call presenter with correct values', async () => {
    const { sut, presenterMock } = sutFactory();
    const presenterSpy = jest.spyOn(presenterMock, 'response');
    await sut.handleRequest();
    expect(presenterSpy).toBeCalledTimes(1);
    expect(presenterSpy).toBeCalledWith(userDataMockFactory());
  });

  it('should return statusCode 200 and user if everything is OK', async () => {
    const { sut } = sutFactory();
    const response = await sut.handleRequest();
    expect(response).toEqual({
      statusCode: 200,
      body: userDataMockFactory(),
    });
  });
});
