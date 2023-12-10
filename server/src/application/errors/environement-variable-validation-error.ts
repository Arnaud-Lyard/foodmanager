import { DefaultApplicationError } from '../../application/errors/default-application-error';

export class EnvironmentVariableValidationError extends DefaultApplicationError {
  name = 'EnvironmentVariableValidationError';
  statusCode = 500;
}
