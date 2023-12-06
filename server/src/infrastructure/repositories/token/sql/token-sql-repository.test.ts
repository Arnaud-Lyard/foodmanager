/* eslint-disable @typescript-eslint/no-explicit-any */
import { Token } from '../../../../domain/models/token/token';
import db from '../../../../infrastructure/prisma/connection';
import { TokenSqlRepository } from './token-sql-repository';

const sutFactory = () => {
  const sut = new TokenSqlRepository();

  return {
    sut,
  };
};

const dateFactory = (future = true) => {
  const additionalDay = future ? +86400000 : -86400000;
  const date = new Date(new Date().getTime() + additionalDay);
  return date;
};

describe('TokenRepository', () => {
  beforeAll(async () => {
    await db.user.createMany({
      data: [
        {
          id: '48575f86-8282-4353-9f1b-9cf29175a9dd',
          firstName: 'first_name_1',
          lastName: 'last_name_1',
          email: 'user1@email.fr',
          passwordHash: 'password_hash_1',
        },
        {
          id: '731a5773-0a73-4cea-90c7-590795dfe4ad',
          firstName: 'first_name_2',
          lastName: 'last_name_2',
          email: 'user2@email.fr',
          passwordHash: 'password_hash_2',
        },
        {
          id: '8a8e6016-a545-4410-aa27-8cc621e25f03',
          firstName: 'first_name_3',
          lastName: 'last_name_3',
          email: 'user3@email.fr',
          passwordHash: 'password_hash_3',
        },
      ],
    });
    await db.token.createMany({
      data: [
        {
          id: '0d3c1040-ef5d-43e8-8a69-934d11a001de',
          token: 'token_1',
          userId: '48575f86-8282-4353-9f1b-9cf29175a9dd',
          expiresIn: dateFactory(),
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: '78927ffa-c37d-40e4-8c83-1d4f727c163a',
          token: 'token_2',
          userId: '731a5773-0a73-4cea-90c7-590795dfe4ad',
          expiresIn: dateFactory(),
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: '0da071be-07f5-4827-a6f6-529d3ace5c8e',
          token: 'expired_token',
          userId: '8a8e6016-a545-4410-aa27-8cc621e25f03',
          expiresIn: dateFactory(false),
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      ],
    });
  });

  afterAll(async () => {
    // const deleteToken = db.token.deleteMany();
    const deleteUser = db.user.deleteMany({
      where: {
        OR: [
          {
            id: '48575f86-8282-4353-9f1b-9cf29175a9dd',
          },
          {
            id: '731a5773-0a73-4cea-90c7-590795dfe4ad',
          },
          {
            id: '8a8e6016-a545-4410-aa27-8cc621e25f03',
          },
        ],
      },
    });
    await db.$transaction([deleteUser]);
    await db.$disconnect();
  });

  it('should find by id', async () => {
    const { sut } = sutFactory();

    await expect(
      sut.findById('0d3c1040-ef5d-43e8-8a69-934d11a001de'),
    ).resolves.toEqual({
      id: '0d3c1040-ef5d-43e8-8a69-934d11a001de',
      token: 'token_1',
      userId: '48575f86-8282-4353-9f1b-9cf29175a9dd',
      expiresIn: expect.any(Date),
    });
  });

  it('should return null if token is not found', async () => {
    const { sut } = sutFactory();
    const tokenData = (await sut.findById(
      'a82e17db-1144-4a56-9811-f812aff15b31',
    )) as Token;
    expect(tokenData).toBeNull();
  });

  it('should return null if token is expired', async () => {
    const { sut } = sutFactory();
    await expect(
      sut.findById('0da071be-07f5-4827-a6f6-529d3ace5c8e'),
    ).resolves.toBeNull();
  });

  it('should return null if token is not found', async () => {
    const { sut } = sutFactory();
    const tokenData = (await sut.findByToken('token_abc')) as Token;
    expect(tokenData).toBeNull();
  });

  it('should return null if token is expired', async () => {
    const { sut } = sutFactory();
    const tokenData = (await sut.findByToken('expired_token')) as Token;
    expect(tokenData).toBeNull();
  });

  it('should find by user id', async () => {
    const { sut } = sutFactory();
    await expect(
      sut.findByUserId('731a5773-0a73-4cea-90c7-590795dfe4ad'),
    ).resolves.toEqual({
      id: '78927ffa-c37d-40e4-8c83-1d4f727c163a',
      token: 'token_2',
      userId: '731a5773-0a73-4cea-90c7-590795dfe4ad',
      expiresIn: expect.any(Date),
    });
  });

  it('should return null if token is not found', async () => {
    const { sut } = sutFactory();
    const tokenData = await sut.findByUserId(
      '8a8e6016-a545-4410-aa27-8cc621e25f03',
    );
    expect(tokenData).toBeNull();
  });

  it('should return null if token is expired', async () => {
    const { sut } = sutFactory();
    const tokenData = (await sut.findByUserId(
      'a80fa258-387d-4aab-bda2-4354043b5275',
    )) as Token;
    expect(tokenData).toBeNull();
  });

  it('should create a token', async () => {
    const { sut } = sutFactory();

    const tokenData = await sut.create({
      token: 'new_token',
      expiresIn: dateFactory(),
      userId: '8a8e6016-a545-4410-aa27-8cc621e25f03',
    });

    expect(tokenData.id).toBeTruthy();
    expect(tokenData.token).toBe('new_token');
    expect(tokenData.userId).toBe('8a8e6016-a545-4410-aa27-8cc621e25f03');
    expect(tokenData.expiresIn).toBeTruthy();
  });

  it('should delete a token by userId', async () => {
    const { sut } = sutFactory();

    await sut.create({
      token: 'new_token_two',
      expiresIn: dateFactory(),
      userId: '731a5773-0a73-4cea-90c7-590795dfe4ad',
    });
    await sut.deleteByUserId('731a5773-0a73-4cea-90c7-590795dfe4ad');
    const tokenData = await sut.findByUserId(
      '731a5773-0a73-4cea-90c7-590795dfe4ad',
    );

    expect(tokenData).toBeNull();
  });

  it('should throw if no data is provided', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.create({} as any);
    } catch (e: any) {
      error = e;
    }

    expect(error.name).toBe('RepositoryError');
    expect(error.message).toBe('Cannot create token without the values');
  });

  it('should throw if repository throws', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.create({
        id: 'abc',
        token: 132,
        expiresIn: 'abc',
        userId: 'abc',
      } as any);
    } catch (e: any) {
      error = e;
    }

    expect(error.name).toBe('RepositoryError');
    expect(error.message).toBe('Could not create token');
  });
});
