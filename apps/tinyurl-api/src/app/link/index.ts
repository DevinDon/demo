import { ResterModule } from '@rester/core';
import { LinkEntity } from './link.entity';
import { LinkView } from './link.view';
import { LinksView } from './links.view';

export const LinkModule: ResterModule = {
  entities: [LinkEntity],
  views: [LinkView, LinksView],
};
