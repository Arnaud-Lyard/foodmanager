import { EnvironmentVariableValidationError } from './environement-variable-validation-error';

describe('EnvironmentVariableValidationError', () => {
  it('should have properties statusCode and messages', () => {
    let error;

    const throwFn = () => {
      try {
        throw new EnvironmentVariableValidationError('Some error message.');
      } catch (e) {
        error = e;
      }
    };

    throwFn();
    expect(error).toEqual(
      expect.objectContaining({
        name: 'EnvironmentVariableValidationError',
        message: 'Some error message.',
        statusCode: 500,
        messages: expect.arrayContaining(['Some error message.']),
      }),
    );
  });
});
