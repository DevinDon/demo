import { DEFAULT_DEV_CONFIG, ResterConfig } from '@rester/core';
import { Level } from '@rester/logger';

const config: ResterConfig = {
  ...DEFAULT_DEV_CONFIG,
  databases: [
    {
      type: 'mongodb',
      host: 'database.don.red',
      port: 27017,
      database: 'tinyurl',
      username: 'tinyurl',
      password: 'tinyurl',
      authSource: 'tinyurl',
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
