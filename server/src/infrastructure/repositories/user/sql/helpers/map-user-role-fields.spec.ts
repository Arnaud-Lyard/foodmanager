/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../../../../../domain/models/user/user';
import {
  UserWithRolesPayload,
  mapUserRoleFields,
} from './map-user-role-fields';

const sutFactory = () => {
  const sut = mapUserRoleFields;

  return {
    sut,
  };
};

describe('mapUserRoleFields', () => {
  it('should map role rows to a single user', async () => {
    const { sut } = sutFactory();
    const userWithRoles: UserWithRolesPayload = {
      id: '48575f86-8282-4353-9f1b-9cf29175a9dd',
      firstName: 'user1',
      lastName: 'user1',
      email: 'user1@email.fr',
      passwordHash: 'any_hash',
      userRole: [
        {
          id: 'a43315da-b934-482c-b83a-57b5eb7dc2cd',
          userId: '48575f86-8282-4353-9f1b-9cf29175a9dd',
          roleId: '1bcf0faf-3107-4bf0-a223-18c6f59b5ca3',
          role: {
            id: '1bcf0faf-3107-4bf0-a223-18c6f59b5ca3',
            name: 'superAdmin',
            description: 'Allow to do everything',
          },
        },
        {
          id: 'b664fbd7-cfe3-4f0f-8ce6-def4f6a0e306',
          userId: '48575f86-8282-4353-9f1b-9cf29175a9dd',
          roleId: 'd9b01823-9907-4fd4-a86d-d041ac6d58ae',
          role: {
            id: 'd9b01823-9907-4fd4-a86d-d041ac6d58ae',
            name: 'admin',
            description: 'Allow to manage moderators',
          },
        },
      ],
    };

    const userMap = sut(userWithRoles) as Required<User>;

    expect(userMap.roles).toEqual([
      {
        id: '1bcf0faf-3107-4bf0-a223-18c6f59b5ca3',
        name: 'superAdmin',
        description: 'Allow to do everything',
      },
      {
        id: 'd9b01823-9907-4fd4-a86d-d041ac6d58ae',
        name: 'admin',
        description: 'Allow to manage moderators',
      },
    ]);
  });
});
