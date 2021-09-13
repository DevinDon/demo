import { Middleware } from 'koa';

export const signin: Middleware = async (c, next) => {
  const req = c.request.body || {};
  c.body = {
    id: Date.now(),
    status: req.name === 'testname' && req.password === 'password'
  };
  await next();
};

export default signin;
