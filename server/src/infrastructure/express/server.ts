/* istanbul ignore file */
require('dotenv').config();
import express from 'express';
import { setupApp } from './setup/setup-app';
import { setupAsyncErrors } from './setup/setup-async-errors';
import { setupGlobalMiddlewares } from './setup/setup-global-middlewares';
import { setupRoutes } from './setup/setup-routes';
import { validateEnvVariables } from '../zod/server-env-schema';

export const app = express();

setupApp(app);
setupGlobalMiddlewares(app);
setupRoutes(app);
setupAsyncErrors(app); // It has to be placed after all routes and middlewares

validateEnvVariables();

// Port can be configured in .env file
const port = process.env.PORT;
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server listening -> http://127.0.0.1:${port}`);
  });
}
