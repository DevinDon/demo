import { Middleware } from 'koa';
import { getOffset } from '../config';
import { Motto } from '../../entity/motto.entity';
import { Resp } from '../../type';

interface REQContent {
  amount?: number;
}

type RESPContent = Partial<Motto>[];

/** POST: Motto[]. */
export const mottos: Middleware = async (c, next) => {
  const req: REQContent = {
    amount: c.request.body.amount || 10
  };
  const results: RESPContent = await Motto
    .createQueryBuilder()
    .offset(getOffset(await Motto.count(), req.amount as number))
    .limit(req.amount)
    .getMany();
  const data: RESPContent = [];
  for (const result of results) {
    data.push({
      id: result.id,
      author: result.author,
      text: result.text
    });
  }
  (c.body as Resp<RESPContent>) = {
    id: Date.now(),
    status: Boolean(data.length),
    content: data
  };
  await next();
};

export default mottos;
