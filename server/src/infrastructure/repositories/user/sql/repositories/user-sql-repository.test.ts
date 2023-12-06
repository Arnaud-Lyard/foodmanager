/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../../../../../domain/models/user/user';
import db from '../../../../../infrastructure/prisma/connection';
import { UserSqlRepository } from './user-sql-repository';

const sutFactory = () => {
  const sut = new UserSqlRepository();

  return {
    sut,
  };
};

describe('UserSqlRepository', () => {
  beforeAll(async () => {
    await db.user.createMany({
      data: [
        {
          id: '97ec8c72-b728-47be-b1f7-1cb6e5611211',
          firstName: 'first_name_1',
          lastName: 'last_name_1',
          email: 'user01@email.fr',
          passwordHash: 'password_hash_1',
        },
        {
          id: 'd038f397-c52f-4a99-a2a1-903b9c7b1023',
          firstName: 'first_name_2',
          lastName: 'last_name_2',
          email: 'user02@email.fr',
          passwordHash: 'password_hash_2',
        },
        {
          id: '2c709031-663b-4230-9027-3aa10dd2f48b',
          firstName: 'first_name_3',
          lastName: 'last_name_3',
          email: 'user03@email.fr',
          passwordHash: 'password_hash_3',
        },
      ],
    });
    await db.role.createMany({
      data: [
        {
          id: 'bf3bfb12-4597-453b-ae98-109a2999d8d1',
          name: 'role_1',
          description: 'description_1',
        },
        {
          id: '0b981fa8-51f2-4f7d-9fe1-dcaaec403386',
          name: 'role_2',
          description: 'description_2',
        },
        {
          id: '397feadc-5773-4694-84e8-5c6af09d878d',
          name: 'role_3',
          description: 'description_3',
        },
      ],
    });
    await db.userRole.createMany({
      data: [
        {
          id: 'a9eedced-557a-4ef7-bc28-d1190eed1805',
          userId: '97ec8c72-b728-47be-b1f7-1cb6e5611211',
          roleId: 'bf3bfb12-4597-453b-ae98-109a2999d8d1',
        },
        {
          id: '72d05ac3-582c-44b9-b3e7-b70a3725eff9',
          userId: 'd038f397-c52f-4a99-a2a1-903b9c7b1023',
          roleId: '0b981fa8-51f2-4f7d-9fe1-dcaaec403386',
        },
        {
          id: '48184e47-59d6-4f92-8fd0-6740506bd13c',
          userId: '2c709031-663b-4230-9027-3aa10dd2f48b',
          roleId: '397feadc-5773-4694-84e8-5c6af09d878d',
        },
      ],
    });
  });
  beforeEach(async () => {});
  afterAll(async () => {
    // const deleteUserRole = db.userRole.deleteMany({
    //   where: {
    //     OR: [
    //       { userId: '97ec8c72-b728-47be-b1f7-1cb6e5611211' },
    //       { userId: 'd038f397-c52f-4a99-a2a1-903b9c7b1023' },
    //       { userId: '2c709031-663b-4230-9027-3aa10dd2f48b' },
    //     ],
    //   },
    // });
    const deleteRole = db.role.deleteMany({
      where: {
        OR: [
          { id: 'bf3bfb12-4597-453b-ae98-109a2999d8d1' },
          { id: '0b981fa8-51f2-4f7d-9fe1-dcaaec403386' },
          { id: '397feadc-5773-4694-84e8-5c6af09d878d' },
        ],
      },
    });
    const deleteUser = db.user.deleteMany({
      where: {
        OR: [
          { id: '97ec8c72-b728-47be-b1f7-1cb6e5611211' },
          { id: 'd038f397-c52f-4a99-a2a1-903b9c7b1023' },
          { id: '2c709031-663b-4230-9027-3aa10dd2f48b' },
          { email: 'another@email.com' },
        ],
      },
    });
    await db.$transaction([deleteUser, deleteRole]);
    await db.$disconnect();
  });

  it('should find a user by id', async () => {
    const { sut } = sutFactory();
    await expect(
      sut.findById('97ec8c72-b728-47be-b1f7-1cb6e5611211'),
    ).resolves.toEqual({
      id: '97ec8c72-b728-47be-b1f7-1cb6e5611211',
      firstName: 'first_name_1',
      lastName: 'last_name_1',
      email: 'user01@email.fr',
      passwordHash: 'password_hash_1',
    });
  });

  it('should return null if no user is found', async () => {
    const { sut } = sutFactory();
    const user = await sut.findById('5c84f555-f7d9-402f-87e5-e642d670f612');
    expect(user).toBeNull();
  });

  it('should find a user by email', async () => {
    const { sut } = sutFactory();
    await expect(sut.findByEmail('user01@email.fr')).resolves.toEqual({
      id: '97ec8c72-b728-47be-b1f7-1cb6e5611211',
      firstName: 'first_name_1',
      lastName: 'last_name_1',
      email: 'user01@email.fr',
      passwordHash: 'password_hash_1',
    });
  });

  it('should return null if no user is found', async () => {
    const { sut } = sutFactory();
    const user = await sut.findByEmail('unknown@email.fr');
    expect(user).toBeNull();
  });

  it('should create a new user if data is correct', async () => {
    const { sut } = sutFactory();
    const createdUser = await sut.create({
      firstName: 'another_firstName',
      lastName: 'another_lastName',
      email: 'another@email.com',
      passwordHash: 'another_hash',
    });
    expect(createdUser.id).toBeTruthy();
    expect(createdUser.firstName).toBe('another_firstName');
    expect(createdUser.lastName).toBe('another_lastName');
    expect(createdUser.email).toBe('another@email.com');
    expect(createdUser.passwordHash).toBe('another_hash');
  });

  it('should throw if data is incorrect', async () => {
    const { sut } = sutFactory();

    let error;
    try {
      await sut.create({
        lastName: 'another_lastName',
        email: 'another@email.com',
        passwordHash: 'another_hash',
      } as any);
    } catch (e: any) {
      error = e;
    }

    expect(error.name).toBe('RepositoryError');
    expect(error.message).toBe('Could not create User');
    expect(error.statusCode).toBe(500);
  });

  it('should delete a user if exists', async () => {
    const { sut } = sutFactory();
    const deleted = await sut.deleteById(
      '2c709031-663b-4230-9027-3aa10dd2f48b',
    );
    expect(deleted).toBe(1);
  });

  it('should return 0 if user do not exist', async () => {
    const { sut } = sutFactory();
    const deleted = await sut.deleteById(
      '73bde3df-b945-4622-ac13-1a36ab35c3f6',
    );
    expect(deleted).toBe(0);
  });

  it('should update a user if data is correct', async () => {
    const { sut } = sutFactory();
    const updated = await sut.update('97ec8c72-b728-47be-b1f7-1cb6e5611211', {
      firstName: 'another_firstName',
      lastName: 'another_lastName',
      email: 'another_updated@email.com',
      passwordHash: 'another_hash',
    });
    expect(updated).toBe(1);
  });

  it('should return 0 if update user do not exist', async () => {
    const { sut } = sutFactory();
    const updated = await sut.update('3c392fec-e80d-4a75-a4ef-bfaee435558c', {
      firstName: 'another_firstName',
      lastName: 'another_lastName',
      email: 'another_updated@email.com',
      passwordHash: 'another_hash',
    });
    expect(updated).toBe(0);
  });

  it('should throw if user data is empty when updating', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.update('97ec8c72-b728-47be-b1f7-1cb6e5611211', {});
    } catch (e: any) {
      error = e;
    }

    expect(error.name).toBe('RepositoryError');
    expect(error.message).toBe('Could not create User');
    expect(error.statusCode).toBe(500);
  });

  it('should find all users', async () => {
    const { sut } = sutFactory();
    const users = await sut.find('desc', 100, 0);
    expect(users.length).toBeGreaterThan(0);
  });

  it('should find a user with roles', async () => {
    const { sut } = sutFactory();
    const users = (await sut.findOneWithRoles(
      'd038f397-c52f-4a99-a2a1-903b9c7b1023',
    )) as User;
    expect(users.roles).toEqual([
      {
        id: '0b981fa8-51f2-4f7d-9fe1-dcaaec403386',
        name: 'role_2',
        description: 'description_2',
      },
    ]);
  });

  it('should return null if user with roles is not found', async () => {
    const { sut } = sutFactory();
    const users = (await sut.findOneWithRoles(
      '72d86037-15a6-41e4-a061-c43706d704fa',
    )) as User;
    expect(users).toBeNull();
  });
});
