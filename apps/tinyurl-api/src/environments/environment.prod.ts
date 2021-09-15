import { DEFAULT_PROD_CONFIG, ResterConfig } from '@rester/core';
import { Level } from '@rester/logger';

const config: ResterConfig = {
  ...DEFAULT_PROD_CONFIG,
  databases: [
    {
      type: 'mongodb',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 27017),
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      authSource: process.env.DB_AUTH_SOURCE || process.env.DB_NAME || 'admin',
      logger: +(process.env.DB_LOG_LEVEL || Level.INFO),
      sync: false,
      entities: null,
    },
  ],
};

export const environment = {
  production: true,
  config,
};
