import { DEFAULT_PROD_CONFIG, ResterConfig } from '@rester/core';

const config: ResterConfig = {
  ...DEFAULT_PROD_CONFIG,
};

export const environment = {
  production: true,
  config,
};
