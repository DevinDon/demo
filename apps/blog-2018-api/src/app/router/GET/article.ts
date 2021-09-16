import { Middleware } from 'koa';
import { Article } from '../../entity/article.entity';
import { Resp } from '../../type';

interface REQContent {
  id?: number;
}

type RESPContent = Partial<Article>;

/** GET: Article. */
export const article: Middleware = async (c, next) => {
  const req: REQContent = {
    id: +(c.query.id as string),
  };
  const result = await Article.findOne(req.id);
  (c.body as Resp<RESPContent>) = {
    id: Date.now(),
    status: Boolean(result),
    content: result || {},
  };
  await next();
};

export default article;
