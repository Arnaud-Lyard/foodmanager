import z from 'zod';
import { EnvironmentVariableValidationError } from '../../application/errors/environement-variable-validation-error';

export const envVariablesSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string(),
  TEST_DATABASE_URL: z.string(),
  PORT: z.string(),
  DEBUG: z.string(),
  JWT_SECRET: z.string(),
  JWT_SECRET_REFRESH: z.string(),
  JWT_SECRET_EXPIRATION_SECS: z.string(),
  JWT_SECRET_REFRESH_EXPIRATION_SECS: z.string(),
});

export function validateEnvVariables() {
  const envVariables = envVariablesSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
    PORT: process.env.PORT,
    DEBUG: process.env.DEBUG,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_SECRET_REFRESH: process.env.JWT_SECRET_REFRESH,
    JWT_SECRET_EXPIRATION_SECS: process.env.JWT_SECRET_EXPIRATION_SECS,
    JWT_SECRET_REFRESH_EXPIRATION_SECS:
      process.env.JWT_SECRET_REFRESH_EXPIRATION_SECS,
  });

  if (!envVariables.success) {
    let errorsFormatted: string = '';
    for (let i = 0; i < envVariables.error.errors.length; i++) {
      const error = envVariables.error.errors[i];
      if (i === 0) {
        errorsFormatted += `${error.path} : ${error.message}`;
      } else {
        errorsFormatted += `, ${error.path} : ${error.message}`;
      }
    }
    const environmentValidationError = new EnvironmentVariableValidationError(
      `Environment variable invalid : ${errorsFormatted}`,
    );
    throw environmentValidationError;
    process.exit(1);
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariablesSchema> {}
  }
}
