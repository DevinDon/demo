import { Middleware } from 'koa';
import { Motto } from '../../entity/motto.entity';
import { Resp } from '../../type';

interface REQContent {
  id?: number;
}

type RESPContent = Partial<Motto>;

/** GET: Motto. */
export const motto: Middleware = async (c, next) => {
  const req: REQContent = {
    id: +(c.query.id as string),
  };
  const result = await Motto.findOne(req.id);
  (c.body as Resp<RESPContent>) = {
    id: Date.now(),
    status: Boolean(result),
    content: result || {},
  };
  await next();
};

export default motto;
