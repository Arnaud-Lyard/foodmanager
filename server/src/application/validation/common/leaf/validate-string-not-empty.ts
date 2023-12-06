import { RequestValidationError } from '../../../errors/request-validation-error';
import { ValidationComposite } from '../../../ports/validation/validation-composite';

export class ValidateStringNotEmpty extends ValidationComposite<string> {
  async validate(string: string): Promise<void> | never {
    if (typeof string !== 'string' || !string) {
      throw new RequestValidationError('Expected a string with a value');
    }
  }
}
