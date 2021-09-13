import { Middleware } from 'koa';
import { Image } from '../../entity/image.entity';
import { Resp } from '../../type';

interface REQContent {
  id?: number;
}

type RESPContent = Partial<Image>;

/** GET: Image. */
export const image: Middleware = async (c, next) => {
  const req: REQContent = {
    id: +(c.query.id as string)
  };
  const result = await Image.findOne(req.id);
  (c.body as Resp<RESPContent>) = {
    id: Date.now(),
    status: Boolean(result),
    content: result || {}
  };
  await next();
};

export default image;
