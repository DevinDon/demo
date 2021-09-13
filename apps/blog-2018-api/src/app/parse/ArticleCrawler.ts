import { JSDOM } from 'jsdom';
import { request } from 'http';
import { Article } from '../entity/article.entity';

interface ArticleNode {
  id: number;
  dom: Document;
}

async function getArticle(id: number) {
  return new Promise<ArticleNode>((rej) => {
    console.log(`正在读取第 ${id} 篇文章.`);
    request(`http://wufazhuce.com/article/${id}`, res => {
      const chunks: any[] = [];
      res.on('data', chunk => {
        chunks.push(chunk);
      });
      res.on('end', async () => {
        const body = Buffer.concat(chunks);
        console.log(`第 ${id} 篇文章读取完毕.`);
        rej({
          id,
          dom: new JSDOM(body.toString()).window.document
        });
      });
    }).end();
  });
}

async function parseArticle(articleNode: ArticleNode) {
  console.log(`开始解析第 ${articleNode.id} 篇文章.`);
  const dom = articleNode.dom;
  const article: Partial<Article> = {
    id: articleNode.id,
    title: (dom.querySelector('.articulo-titulo') as Element).innerHTML.trim(),
    author: (dom.querySelector('.articulo-autor') as Element).innerHTML.trim().slice(3),
    date: 0,
    summary: (dom.querySelector('.comilla-cerrar') as Element).innerHTML.trim(),
    text: ((dom.querySelector('.articulo-contenido') as Element).textContent as string).trim(),
    html: (dom.querySelector('.articulo-contenido') as Element).innerHTML
  };
  console.log(`第 ${article.id} 篇文章解析完毕.`);
  return article;
}

async function save(article: Partial<Article>) {
  if (await Article.findOne({ id: article.id })) {
    console.log(`文章 ${article.id} ${article.title} 已存在, 进行更新操作.`);
    return Article.update({ id: article.id }, article);
  } else {
    return Article.insert(article);
  }
}

export async function run(id = 1) {
  for (let j = id; j < 3600; j++) {
    await getArticle(j)
      .then(v => parseArticle(v))
      .then(v => save(v))
      .then(() => console.log(`数据已保存至数据库, 编号: ${j}.`))
      .catch(r => console.error(`出现错误: ${r}, 文章可能已被删除.`));
  }
}

export async function test(id = 3600) {
  getArticle(id)
    .then(v => parseArticle(v))
    .then(v => save(v));
}
