import { Middleware } from 'koa';
import { RouterPaths } from 'koa-backend-server';
import { Resp } from '../../type';
import { allowAllCORS, getOffset } from '../config';
import articles from './articles';
import images from './images';
import mottos from './mottos';
import songs from './songs';
import signin from './sign/in';

/** POST: Cow say hello. */
const index: Middleware = async (c, next) => {
  (c.body as Resp<any>) = {
    id: Date.now(),
    status: true,
    content: {
      test10_5: getOffset(10, 5),
      test10_10: getOffset(10, 10),
      cowsay: `
 ________
< Hello! >
 --------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\
                ||----w |
                ||     ||
    `,
    },
  };
  await next();
};

const notFound: Middleware = async (c, next) => {
  await next();
  if (c.status === 404) {
    (c.body as Resp) = {
      id: Date.now(),
      status: false,
      content: '404 Not Found',
    };
  }
};

export const POSTPATHS: RouterPaths = {
  index: {
    path: '/',
    ware: index,
    cors: allowAllCORS,
  }, articles: {
    path: '/articles',
    ware: articles,
    cors: allowAllCORS,
  }, images: {
    path: '/images',
    ware: images,
    cors: allowAllCORS,
  }, mottos: {
    path: '/mottos',
    ware: mottos,
    cors: allowAllCORS,
  }, songs: {
    path: '/songs',
    ware: songs,
    cors: allowAllCORS,
  }, 'sign in': {
    path: '/sign/in',
    ware: signin,
    cors: allowAllCORS,
  },
};

export default POSTPATHS;
