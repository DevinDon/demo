import { Middleware } from 'koa';

interface Request {
  name: string;
  email: string;
  want: string;
}

export const form: Middleware = async (c, next) => {
  const req: Request = {
    name: c.request.body.name || '',
    email: c.request.body.email || '',
    want: c.request.body.content || '',
  };
  if (req.email && req.name) {
    c.body = {
      status: true,
      content: '提交成功',
    };
  } else {
    c.body = {
      status: false,
      content: '提交失败',
    };
  }
  await next();
};

export default form;
