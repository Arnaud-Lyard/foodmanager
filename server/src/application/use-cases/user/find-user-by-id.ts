import { NotFoundError } from '../../errors/not-found-error';
import { FindUserByIdRepository } from '../../ports/repositories/user/find-user-by-id-repository';
import { FindUserByIdUseCase } from '../../../domain/use-cases/user/find-user-by-id-use-case';
import { User } from '../../../domain/models/user/user';
import { ValidationComposite } from '../../ports/validation/validation-composite';

export class FindUserById implements FindUserByIdUseCase {
  constructor(
    private readonly repository: FindUserByIdRepository,
    private readonly validation: ValidationComposite,
  ) {}

  async findById(id: string): Promise<User> | never {
    await this.validation.validate(id);
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }
}
