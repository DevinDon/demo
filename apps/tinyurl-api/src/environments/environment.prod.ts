import { DEFAULT_PROD_CONFIG, ResterConfig } from '@rester/core';
import { Level, LevelMap } from '@rester/logger';

const config: ResterConfig = {
  ...DEFAULT_PROD_CONFIG,
  addresses: [
    {
      host: '0.0.0.0',
      port: 8080,
      protocol: 'HTTP',
    },
  ],
  databases: [
    {
      type: 'mongodb',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 27017),
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      authSource: process.env.DB_AUTH_SOURCE || process.env.DB_NAME || 'admin',
      logger: Level.INFO,
      sync: false,
      entities: null,
    },
  ],
  logger: {
    level: LevelMap.INFO,
    trace: false,
    logerr: '/app/err.log',
    logout: '/app/out.log',
  },
};

export const environment = {
  production: true,
  config,
};
