import { Middleware } from 'koa';
import { getOffset } from '../config';
import { Article } from '../../entity/article.entity';
import { Resp } from '../../type';

interface REQContent {
  amount?: number;
}

type RESPContent = Partial<Article>[];

/** POST: Article[]. */
export const articles: Middleware = async (c, next) => {
  const req: REQContent = {
    amount: c.request.body.amount || 6,
  };
  const results: RESPContent = await Article
    .createQueryBuilder()
    .offset(getOffset(await Article.count(), req.amount as number))
    .limit(req.amount)
    .getMany();
  const data: RESPContent = [];
  for (const result of results) {
    data.push({
      id: result.id,
      title: result.title,
      author: result.author,
      date: Date.now(),
      summary: result.summary,
      text: result.text,
      html: result.html,
    });
  }
  (c.body as Resp<RESPContent>) = {
    id: Date.now(),
    status: Boolean(results.length),
    content: data,
  };
  await next();
};

export default articles;
