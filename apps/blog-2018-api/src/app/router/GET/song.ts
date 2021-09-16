import { Middleware } from 'koa';
import { Resp } from '../../type';
import Song from '../../entity/song.entity';

interface REQContent {
  id?: number;
}

type RESPContent = Partial<Song>;

/** GET: Song. */
export const song: Middleware = async (c, next) => {
  const req: REQContent = {
    id: +(c.query.id as string),
  };
  const result = await Song.findOne(req.id);
  (c.body as Resp<RESPContent>) = {
    id: Date.now(),
    status: Boolean(result),
    content: result || {},
  };
  await next();
};

export default song;
