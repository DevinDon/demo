import { CORSHandler, DEFAULT_HANDLERS, Rester } from '@rester/core';
import { AccessModule } from './app/access';
import { AccessHandler } from './app/common/handlers';
import { HostModule } from './app/host';
import { LinkModule } from './app/link';
import { environment } from './environments/environment';

const rester = new Rester({
  handlers: [AccessHandler, ...DEFAULT_HANDLERS, CORSHandler],
  modules: [AccessModule, HostModule, LinkModule],
  ...environment.config,
});

rester.bootstrap();
