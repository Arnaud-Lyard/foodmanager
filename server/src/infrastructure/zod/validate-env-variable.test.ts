import { validateEnvVariables } from './validate-env-variable';
import { envVariablesSchema } from './validate-env-variable';

describe('validateEnvVariable', () => {
  it('should be defined', () => {
    expect(validateEnvVariables).toBeDefined();
  });

  it('should call safeParse with correct values', () => {
    const safeParseSpy = jest.spyOn(envVariablesSchema, 'safeParse');
    expect(validateEnvVariables).toThrow(
      'Environment variable invalid : DATABASE_URL : Required, TEST_DATABASE_URL : Required, PORT : Required, DEBUG : Required, JWT_SECRET : Required, JWT_SECRET_REFRESH : Required, JWT_SECRET_EXPIRATION_SECS : Required, JWT_SECRET_REFRESH_EXPIRATION_SECS : Required',
    );
    expect(safeParseSpy).toHaveBeenCalledTimes(1);
  });
});
