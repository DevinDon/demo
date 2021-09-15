import { BaseView, cleanify, DELETE, ExistResponse, GET, Handler, PathVariable, POST, PUT, RequestBody, requiredAtLeastOneParam, requiredParams, View } from '@rester/core';
import { getEntity } from '@rester/orm';
import { UserAuthHandler } from '../common/handlers';
import { HostCollection, HostEntity } from './host.entity';
import { HostID, HostInsertParams, HostUpdateParams } from './host.model';

// create, remove, modify, take, search
// one, more

@View('host')
@Handler(UserAuthHandler)
export class HostView extends BaseView {

  private entity: HostEntity;
  private collection: HostCollection;

  async init() {
    this.entity = getEntity(HostEntity);
    this.collection = this.entity.collection;
  }

  @POST()
  async create(
    @RequestBody() { domain, expiredAt }: HostInsertParams,
  ) {
    requiredParams(domain);
    return new ExistResponse({
      statusCode: 201,
      data: await this.entity.insertOne({
        domain,
        createdAt: new Date(),
        updatedAt: new Date(),
        expiredAt,
      }),
      message: 'Host created failed.',
    });
  }

  @DELETE(':id')
  async remove(@PathVariable('id') id: HostID) {
    return this.entity.deleteOne(id);
  }

  @PUT(':id')
  async modify(
    @PathVariable('id') id: HostID,
    @RequestBody() { domain, expiredAt }: HostUpdateParams,
  ) {
    requiredAtLeastOneParam({ domain, expiredAt });
    return new ExistResponse({
      data: await this.entity.updateOne(id, cleanify({ domain, expiredAt, updateAt: new Date() })),
      message: 'Host not found.',
    });
  }

  @GET(':id')
  async take(
    @PathVariable('id') id: HostID,
  ) {
    return new ExistResponse({
      data: await this.entity.findOne(id),
      message: 'Host not found.',
    });
  }

}
