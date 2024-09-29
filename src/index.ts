import env from './config/env';
import startServer from './server';

void startServer({ apiVersion: env.API_VERSION, dbUrl: env.DB_URL, port: env.PORT });
