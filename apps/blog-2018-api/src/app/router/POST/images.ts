import { Middleware } from 'koa';
import { getOffset } from '../config';
import { Image } from '../../entity/image.entity';
import { Resp } from '../../type';

interface REQContent {
  amount?: number;
}

type RESPContent = Partial<Image>[];

/** POST: Image[]. */
export const images: Middleware = async (c, next) => {
  const req: REQContent = {
    amount: c.request.body.amount || 6
  };
  const results: RESPContent = await Image
    .createQueryBuilder()
    .offset(getOffset(await Image.count(), req.amount as number))
    .limit(req.amount)
    .getMany();
  const data: RESPContent = [];
  for (const result of results) {
    data.push({
      id: result.id,
      link: result.link,
      image: result.image,
      text: result.text,
      date: result.date
    });
  }
  (c.body as Resp<RESPContent>) = {
    id: Date.now(),
    status: Boolean(results.length),
    content: data
  };
  await next();
};

export default images;
