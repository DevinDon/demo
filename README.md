# Demo 项目合集

以前做的所有展示类项目的合集，整合以方便持续集成及<del>后续维护</del>。

## 项目列表 / Project List

### 1 某某某的小窝

大学时候帮同学搞的期末作业，一个简单的个人博客小网站。刚接触 HTML + CSS 的作品，纯 HTML + CSS 实现，没有任何脚本。

[ [旧仓库](https://github.com/devindon/blog-2017) | [新仓库](https://github.com/DevinDon/demo/tree/main/apps/blog-2017) | [预览地址](https://blog-2017.devin.red) ]

### 2 窗台

大学时候的期末作业，一个简单的图文媒体展示网站。刚接触 TypeScript 时的作品，做了一个简单的基于 History API 的单页应用路由，旧仓库的打包是基于 Gulp 做的。

[ [旧仓库](https://github.com/devindon/blog-2018) | [新仓库](https://github.com/DevinDon/demo/tree/main/apps/blog-2018) | [预览地址](https://blog-2018.devin.red) ]

### 3 窗台 - API 后端

前一个项目的 API 后端，主要实现的各种媒体资源的获取以及从资源源站爬取内容的爬虫。刚接触 Koa2 时候的作品，把 Koa 封装了一层叫做 Koa-Backend-Server（已废弃），实现了一些简单的诸如跨域请求控制的中间件。后端存储采用的是 MySQL 数据库。

[ [旧仓库](https://github.com/DevinDon/blog-2018/tree/e92eac2df15757e9ee6293d1016b16f63f0d4c1a/server) | [新仓库](https://github.com/DevinDon/demo/tree/main/apps/blog-2018-api) | [预览地址](https://blog-2018.devin.red/api) ]

### 4 夜寒苏的窗台

大学时候的期末作业，一个基于断点的响应式布局的单页应用博客。刚接触 Angular 时的作品，最后的成品代码忘记推送了，忘了放在哪台电脑里了🙄，这里的代码基本算成品，后端项目的代码大部分未推送。

[ [旧仓库](https://github.com/devindon/blog-2019) | [新仓库](https://github.com/DevinDon/demo/tree/main/apps/blog-over) | [预览地址](https://blog-over.devin.red) ]

### 5 TinyURL

一个简单的短网址前端，基于 Angular 实现，支持链接生成、链接校验、链接还原以及转换历史。

[ [旧仓库](https://github.com/devindon/tinyurl-angular) | [新仓库](https://github.com/DevinDon/demo/tree/main/apps/tinyurl) | [预览地址](https://775.ink) ]

### 6 TinyURL API

短网址项目的 API 后端，基于雪花算法实现了一个简单的短链生成功能，同时可记录访问历史用于分析。项目使用了自己造的后端轮子，一个语法形似 Spring Boot 的 Node.js REST Framework，传送门 [Rester](https://github.com/devindon/rester)，开源在我的隔壁仓库。

[ [旧仓库](https://github.com/devindon/tinyurl-rester) | [新仓库](https://github.com/DevinDon/demo/tree/main/apps/tinyurl-api) | [预览地址](https://775.ink/api) ]

### 7 Zhihu 之乎

仿知乎移动端界面，基于 Angular + Mock.js 实现了模拟数据展示，支持懒加载与缓存及富文本编辑器。

[ [旧仓库](https://github.com/devindon/zhihu-angular) | [新仓库](https://github.com/DevinDon/demo/tree/main/apps/zhihu) | [预览地址](https://zhihu.devin.red) ]

### 8 Weibo Mock API

基于微博开放平台接口文档实现的微博模拟接口，无调用频率限制，仅用于开发，数据为随机生成 + 部分爬取。采用的同样是自己的轮子 [Rester](https://github.com/devindon/rester) 及 MongoDB，同时实现了简单的爬虫功能用于爬取数据。

[ [旧仓库](https://github.com/devindon/weibo-rester) | [新仓库](https://github.com/DevinDon/demo/tree/main/apps/weibo-api) | [预览地址](https://weibo.devin.red/api) ]

## 联系我 / Contact Me

如有任何侵权或其他问题，可通过邮件与作者联系：[夜寒苏的邮箱 i.inf@outlook.com](mailto:i.inf@outlook.com)

欢迎访问我的博客 [夜寒苏的窗台 https://blog.don.red](https://blog.don.red)，此窗台非彼窗台。

## [THE MIT LICENSE](https://raw.githubusercontent.com/DevinDon/license/master/THE%20MIT%20LICENSE)

Copyright IInfinity © 2018+

LICENSE: MIT

Click <https://raw.githubusercontent.com/DevinDon/license/master/THE%20MIT%20LICENSE> to view a copy of this license.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
