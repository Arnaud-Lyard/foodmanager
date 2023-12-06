import { RequestValidationError } from '../../../errors/request-validation-error';
import { ValidationComposite } from '../../../ports/validation/validation-composite';
import { UserRequestPartialFields } from '../../../../domain/models/user/user-request-partial-fields';

export class UserPartialRequiredFieldsValidation extends ValidationComposite<UserRequestPartialFields> {
  async validate(request: UserRequestPartialFields): Promise<void> | never {
    const error = new RequestValidationError('Invalid request');

    const { firstName, lastName, email, password, confirmPassword } = request;

    if (!this.isValidField(firstName)) {
      error.messages.push('Missing field firstName');
    }

    if (!this.isValidField(lastName)) {
      error.messages.push('Missing field lastName');
    }

    if (!this.isValidField(email)) {
      error.messages.push('Missing field email');
    }

    if (!this.isValidField(password)) {
      error.messages.push('Missing field password');
    }

    if (!this.isValidField(confirmPassword)) {
      error.messages.push('Missing field confirmPassword');
    }

    if (error.messages.length > 1) {
      throw error;
    }
  }

  private isValidField(field?: unknown): boolean {
    if (typeof field === 'undefined') {
      return true;
    }

    if (typeof field !== 'string') {
      return false;
    }

    if (field === '') {
      return false;
    }

    return true;
  }
}
