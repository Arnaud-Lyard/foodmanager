import { UserExistsError } from '../../errors/user-exists-error';
import { CreateUserRepository } from '../../ports/repositories/user/create-user-repository';
import { FindUserByEmailRepository } from '../../ports/repositories/user/find-user-by-email-repository';
import { PasswordHashing } from '../../ports/security/password-hashing';
import { UserRequestWithPasswordString } from '../../../domain/models/user/user-request-required-fields';
import { CreateUserUseCase } from '../../../domain/use-cases/user/create-user-use-case';
import { User } from '../../../domain/models/user/user';
import { ValidationComposite } from '../../../application/ports/validation/validation-composite';

export class CreateUser implements CreateUserUseCase {
  constructor(
    private readonly createUserRepository: CreateUserRepository,
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly passwordHashing: PasswordHashing,
    private readonly validation: ValidationComposite<UserRequestWithPasswordString>,
  ) {}

  async create(userData: UserRequestWithPasswordString): Promise<User> {
    await this.validation.validate(userData);
    const userExists = await this.findUserByEmailRepository.findByEmail(
      userData.email,
    );

    if (userExists) {
      throw new UserExistsError('User already created');
    }

    const passwordHash = await this.passwordHashing.hash(userData.password);
    const userWithPasswordHash = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      passwordHash,
    };
    const user = await this.createUserRepository.create(userWithPasswordHash);
    return user;
  }
}
