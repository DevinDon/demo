import { BaseView, GET, PathQuery, View } from '@rester/core';
import { getEntity, Pagination } from '@rester/orm';
import { HostCollection, HostEntity } from './host.entity';

// create, remove, modify, take, search
// one, more

@View('api/hosts')
export class HostsView extends BaseView {

  private entity: HostEntity;
  private collection: HostCollection;

  async init() {
    this.entity = getEntity(HostEntity);
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
