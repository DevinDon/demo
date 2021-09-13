import { KBSConfig, Server } from 'koa-backend-server';
import { Article } from './app/entity/article.entity';
import { Image } from './app/entity/image.entity';
import { Motto } from './app/entity/motto.entity';
import Song from './app/entity/song.entity';
import Statistic from './app/entity/statistic.entity';
import { paths } from './app/router';
import { statistic } from './app/ware';

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
      type: 'mariadb',
      host: 'database.don.red',
      port: 3306,
      username: 'blog-2018-api',
      password: 'blog-2018-api',
      database: 'blog-2018-api',
      synchronize: true,
      logging: true,
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
  },
};

const server: Server = new Server(config)
  .use(statistic);

server.listen();
