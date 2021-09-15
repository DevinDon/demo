export interface Link {

  /** 短网址 ID */
  id: string;

  /** 原网址 */
  origin: string;

  createdAt: Date;

  updatedAt: Date;

}

export type LinkID = string;

export type LinkInsertParams = { url: string };

export type LinkUpdateParams = Partial<Pick<Link, 'origin'>>;
