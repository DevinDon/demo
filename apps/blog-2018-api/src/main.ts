import { KBSConfig, Server } from 'koa-backend-server';
import { Article } from './app/entity/article.entity';
import { Image } from './app/entity/image.entity';
import { Motto } from './app/entity/motto.entity';
import Song from './app/entity/song.entity';
import Statistic from './app/entity/statistic.entity';
import { paths } from './app/router';
import { statistic } from './app/ware';
import { environment } from './environments/environment';

const config: KBSConfig = {
  router: {
    paths,
    version: 'api',
  },
  address: {
    portocol: 'HTTP',
    host: 'localhost',
    port: 8080,
  },
  database: {
    ormconfig: false,
    options: {
      ...{
        type: 'mariadb',
        entities: [
          Article,
          Image,
          Motto,
          Song,
          Statistic,
        ],
        migrations: [],
        subscribers: [],
      },
      ...environment.options,
    },
  },
};

const server: Server = new Server(config)
  .use(statistic);

server.listen();
