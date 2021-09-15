import { Column, Entity, MongoEntity, ObjectId, PaginationParam } from '@rester/orm';
import { Host, HostID } from './host.model';

@Entity({ name: 'host' })
export class HostEntity extends MongoEntity<Host> implements Host {

  @Column()
  _id: ObjectId;

  @Column({ index: true, unique: true })
  domain: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  expiredAt?: Date;

  async getAllHosts() {
    return this.collection
      .find()
      .toArray()
      .then(
        hosts => hosts
          .filter(host => (!host.expiredAt) || (host.expiredAt && host.expiredAt > new Date()))
          .map(host => host.domain)
          .flat(),
      );
  }

  async getRandomList({ take }: Pick<PaginationParam, 'take'>) {
    return { list: await this.collection.aggregate([{ $sample: { size: take } }]).toArray() };
  }

  async insertOne(host: Host) {
    const id = await this.collection
      .insertOne(host)
      .then(result => result.insertedId);
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async deleteOne(id: HostID) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
    return [id];
  }

  async updateOne(id: HostID, host: Partial<Host>) {
    await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: host },
    );
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async findOne(id: HostID) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

}

export type HostCollection = HostEntity['collection'];
