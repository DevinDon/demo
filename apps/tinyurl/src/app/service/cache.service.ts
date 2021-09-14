/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Host, Link } from '../@types';

const CACHE_KEY = 'CACHE_KEY';
const HOSTS_KEY = 'HOSTS_KEY';

@Injectable({
  providedIn: 'root',
})
export class CacheService {

  private links: Link[];
  private hosts: Host[] = [];

  constructor() {
    this.links = JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
  }

  insert(link: Link) {
    if (!this.links.find(item => item.id === link.id)) {
      this.links.push(link);
    };
    this.save();
  }

  save() {
    localStorage.setItem(CACHE_KEY, JSON.stringify(this.links));
  }

  delete() {
    throw new Error('not implement');
  }

  modify() {
    throw new Error('not implement');
  }

  select(url: string): Link | undefined {
    return this.links.find(link => url.includes(link.id) || link.origin === url);
  }

  selectAll(): Link[] {
    return this.links;
  }

  isHosts(request: HttpRequest<any>) {
    return request.url.indexOf('/hosts');
  }

  isLink(request: HttpRequest<any>) {
    return request.url.indexOf('/link');
  }

  setHosts(hosts: Host[]) {
    this.hosts = hosts;
    localStorage.setItem(HOSTS_KEY, JSON.stringify(hosts));
  }

  getHosts() {
    return this.hosts;
  }

  getDomain() {
    // eslint-disable-next-line no-bitwise
    return this.hosts[Math.random() * this.hosts.length >> 0]?.domain || 'example.com';
  }

}
