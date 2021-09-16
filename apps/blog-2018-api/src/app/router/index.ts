import { AllPaths } from 'koa-backend-server';
import GETPATH from './GET';
import POSTPATHS from './POST';

export const paths: AllPaths = {
  GET: GETPATH,
  POST: POSTPATHS,
};
