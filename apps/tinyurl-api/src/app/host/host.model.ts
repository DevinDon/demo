import { BaseModel } from '@rester/orm';

export interface Host extends BaseModel {

  domain: string;

  createdAt: Date;

  updatedAt: Date;

  expiredAt?: Date;

}

export type HostID = string;

export type HostInsertParams = Pick<Host, 'domain'> & Partial<Pick<Host, 'expiredAt'>>;

export type HostUpdateParams = Partial<HostInsertParams>;
