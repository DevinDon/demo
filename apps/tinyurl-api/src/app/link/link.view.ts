import { BaseView, cleanify, DELETE, ExistResponse, GET, Handler, HTTP404Exception, InjectedType, Injector, PathVariable, POST, PUT, RedirectResponse, RequestBody, requiredAtLeastOneParam, requiredParams, View } from '@rester/core';
import { getEntity } from '@rester/orm';
import { UserAuthHandler } from '../common/handlers';
import { SnowFlake } from '../common/utils';
import { LinkCollection, LinkEntity } from './link.entity';
import { LinkID, LinkInsertParams, LinkUpdateParams } from './link.model';

// create, remove, modify, take, search
// one, more

@View('link')
export class LinkView extends BaseView {

  private entity: LinkEntity;
  private collection: LinkCollection;
  private snowflake: SnowFlake;

  async init() {
    this.entity = getEntity(LinkEntity);
    this.collection = this.entity.collection;
    this.snowflake = Injector.create({ target: SnowFlake, type: InjectedType.ANY }).instance as SnowFlake;
  }

  @POST()
  async create(
    @RequestBody() { url }: LinkInsertParams,
  ) {
    requiredParams(url);
    const isTinyURL = await this.entity.isTinyurl(url);
    if (isTinyURL) {
      return new ExistResponse({
        data: await this.entity.access(isTinyURL),
        message: 'TinyURL not found.',
      });
    }
    return new ExistResponse({
      statusCode: 201,
      data: await this.entity.insertOne({
        id: this.snowflake.nextID().toString(36),
        origin: url,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      message: 'Link created failed.',
    });
  }

  @DELETE(':id')
  @Handler(UserAuthHandler)
  async remove(@PathVariable('id') id: LinkID) {
    return this.entity.deleteOne(id);
  }

  @PUT(':id')
  @Handler(UserAuthHandler)
  async modify(
    @PathVariable('id') id: LinkID,
    @RequestBody() { origin }: LinkUpdateParams,
  ) {
    requiredAtLeastOneParam(origin);
    return new ExistResponse({
      data: await this.entity.updateOne(id, cleanify({ origin, updateAt: new Date() })),
      message: 'Link not found.',
    });
  }

  @GET(':id')
  async take(
    @PathVariable('id') id: LinkID,
  ) {
    const link = await this.entity.access(id);
    if (!link) {
      throw new HTTP404Exception(`Link '${id}' not found.`);
    }
    return new RedirectResponse({ url: encodeURI(link.origin), temporarily: true });
  }

}
