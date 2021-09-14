import { CORSHandler, DEFAULT_HANDLERS, Rester } from '@rester/core';
import { AccessModule } from './app/access';
import { CommentModule } from './app/comment';
import { AccessHandler } from './app/common/handlers';
import { ManageModule } from './app/manage';
import { StatusModule } from './app/status';
import { UserModule } from './app/user';
import { WeiboModule } from './app/weibo';
import { environment } from './environments/environment';

const rester = new Rester({
  handlers: [AccessHandler, ...DEFAULT_HANDLERS, CORSHandler],
  modules: [
    AccessModule,
    UserModule,
    CommentModule,
    StatusModule,
    WeiboModule,
    ManageModule,
  ],
  ...environment.config,
});

rester.bootstrap();
