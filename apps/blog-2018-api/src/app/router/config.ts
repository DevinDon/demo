import { CORS } from 'koa-backend-server';
import { readFileSync } from 'fs';
import { LocalConfig } from '../type';

export const allowAllCORS: CORS = {
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': ['POST', 'OPTIONS', 'GET'],
  'Access-Control-Allow-Origin': '*',
};

export function getOffset(total: number, amount: number): number {
  return Math.ceil(Math.random() * Math.max(total - amount, 0));
}

/** 从配置文件中读取配置. */
export let localConfig: LocalConfig;

try {
  localConfig = JSON.parse(readFileSync('./server.config.json').toString());
} catch (err) {
  localConfig = {};
  console.warn('无法读取本地配置, 将不会加载静态文件. Cannot read local config file.');
}

export const files = {
  index: localConfig.static ? readFileSync(`${localConfig.static}/index.html`).toString() : '',
};
