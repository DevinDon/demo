import { ResterModule } from '@rester/core';
import { HostEntity } from './host.entity';
import { HostView } from './host.view';
import { HostsView } from './hosts.view';

export const HostModule: ResterModule = {
  entities: [HostEntity],
  views: [HostView, HostsView],
};
