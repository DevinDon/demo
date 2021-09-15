import { Column, Entity, getEntity, MongoEntity, ObjectId, PaginationParam } from '@rester/orm';
import { HostEntity } from '../host/host.entity';
import { Link, LinkID } from './link.model';

@Entity({ name: 'link' })
export class LinkEntity extends MongoEntity<Link> implements Link {

  @Column()
  _id: ObjectId;

  @Column({ index: true, unique: true })
  id: string;

  @Column({ index: true })
  origin: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  async isTinyurl(url: string): Promise<string | false> {
    const hostEntity: HostEntity = getEntity(HostEntity);
    const { hostname, pathname } = new URL(url);
    const hosts = await hostEntity.getAllHosts();
    return hosts.includes(hostname) && pathname.split('/').length === 2 && pathname.replace('/', '');
  }

  async access(urlID: string) {
    return this.collection.findOne({ id: urlID });
  }

  async getRandomList({ take }: Pick<PaginationParam, 'take'>) {
    return { list: await this.collection.aggregate([{ $sample: { size: take } }]).toArray() };
  }

  async insertOne(link: Link) {
    const id = await this.collection
      .insertOne(link)
      .then(result => result.insertedId);
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async deleteOne(id: LinkID) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
    return [id];
  }

  async updateOne(id: LinkID, link: Partial<Link>) {
    await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: link },
    );
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async findOne(id: LinkID) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

}

export type LinkCollection = LinkEntity['collection'];
