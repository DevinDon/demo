export interface Host {
  domain: string;
  createdAt: Date;
  updatedAt: Date;
  expiredAt: Date;
}

export interface Hosts {
  next: string;
  list: Host[];
}
