import { ConfigProps } from './config.interface';

export const config = (): ConfigProps => ({
  API: {
    PORT: parseInt(process.env.API_PORT, 10) || 3000,
    PATH: process.env.API_PATH || 'api',
  },
  DB: {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: parseInt(process.env.DB_PORT, 10) || 5432,
    USERNAME: process.env.DB_USERNAME || 'postgres',
    PASSWORD: process.env.DB_PASSWORD || 'postgres',
    NAME: process.env.DB_NAME || 'postgres',
  },
});
