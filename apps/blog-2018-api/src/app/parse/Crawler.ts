import { request } from 'http';
import { JSDOM } from 'jsdom';

export interface DOM<T = string> {
  id: number;
  url: string;
  doc: Document;
}

export class Crawler<T = any> {

  /**
   * 获取目标文档.
   * @param url 目标链接.
   */
  protected async fetch(url: string): Promise<DOM> {
    return new Promise<DOM>(rej => {
      console.log(`正在获取文档: ${url}`);
      request(url, res => {
        const chunks: any[] = [];
        res.on('data', chunk => {
          chunks.push(chunk);
        });
        res.on('end', async () => {
          const body = Buffer.concat(chunks);
          rej({
            id: Date.now(),
            url,
            doc: new JSDOM(body.toString()).window.document,
          });
          console.log(`文档读取完毕: ${url}`);
        });
      }).end();
    });
  }

  /**
   * 解析文档数据.
   * @param data 文档数据.
   */
  protected async parse(data: DOM): Promise<Partial<T>> {
    // console.log(`开始解析文档: ${data.url}`);
    // console.log(`文档解析完毕: ${data.url}`);
    console.log('请重写此方法.');
    return {};
  }

  /**
   * 保存至数据库.
   * @param data 数据.
   */
  protected async save(data: Partial<T>): Promise<boolean> {
    console.log('请重写此方法');
    return false;
  }

  /**
   * 执行爬取.
   * @param url 目标地址.
   */
  public async run(url: string): Promise<boolean> {
    console.log(`开始执行爬取: ${url}`);
    return this
      .fetch(url)
      .then(v => this.parse(v))
      .then(v => this.save(v))
      .then(v => {
        console.log(`资源已经保存至数据库: ${url}`);
        return true;
      })
      .catch(r => {
        console.error(`出现错误, 资源可能不存在, 链接: ${url}, 原因: ${r}.`);
        return false;
      });
  }

}

export default Crawler;
