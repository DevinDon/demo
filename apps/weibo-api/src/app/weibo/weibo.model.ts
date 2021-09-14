import { ObjectId } from 'mongodb';

export interface Weibo {

  _id: ObjectId;

  id: number;

  token: string;

}
