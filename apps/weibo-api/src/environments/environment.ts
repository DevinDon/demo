import { DEFAULT_DEV_CONFIG, ResterConfig } from '@rester/core';
import { Level } from '@rester/logger';

const config: ResterConfig = {
  ...DEFAULT_DEV_CONFIG,
  databases: [
    {
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'rester-dev',
      username: 'rester-dev',
      password: 'rester-dev',
      authSource: 'admin',
      logger: Level.DEBUG,
      sync: true,
      entities: null,
    },
  ],
};

export const environment = {
  production: false,
  config,
};
