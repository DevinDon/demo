import { BaseView, GET, Handler, PathQuery, View } from '@rester/core';
import { getEntity, Pagination } from '@rester/orm';
import { UserAuthHandler } from '../common/handlers';
import { LinkCollection, LinkEntity } from './link.entity';

// create, remove, modify, take, search
// one, more

@View('api/links')
@Handler(UserAuthHandler)
export class LinksView extends BaseView {

  private entity: LinkEntity;
  private collection: LinkCollection;

  async init() {
    this.entity = getEntity(LinkEntity);
    this.collection = this.entity.collection;
  }

  @GET()
  async take(
    @PathQuery('random') random: boolean = false,
    @PathQuery('from') from: string = '000000000000000000000000',
    @PathQuery('take') take: number = 10,
  ): Promise<Pagination<string>> {
    return random
      ? this.entity.getRandomList({ take })
      : this.entity.getPagination({ from, take });
  }

}
