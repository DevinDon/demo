import { request } from 'http';
import { JSDOM } from 'jsdom';
import { Image } from '../entity/image.entity';

interface ImageNode {
  id: number;
  dom: Document;
}

export class ImageCrawler {

  /**
   * 获取指定编号的图片.
   * @param id 图片编号.
   */
  private async getHTML(id: number): Promise<ImageNode> {
    return new Promise<ImageNode>((rej) => {
      console.log(`正在读取第 ${id} 张图片的网站.`);
      request(`http://wufazhuce.com/one/${id}`, res => {
        const chunks: any[] = [];
        res.on('data', chunk => {
          chunks.push(chunk);
        });
        res.on('end', async () => {
          const body = Buffer.concat(chunks);
          rej({
            id,
            dom: new JSDOM(body.toString()).window.document
          });
          console.log(`第 ${id} 张图片的网站读取完毕.`);
        });
      }).end();
    });
  }

  private async get(url: string): Promise<string> {
    return new Promise<string>((rej) => {
      console.log(`开始加载图片, 网址: ${url}`);
      request(`${url}`, res => {
        const chunks: any[] = [];
        res.on('data', chunk => {
          chunks.push(chunk);
        });
        res.on('end', async () => {
          console.log(`开始转码图片, 网址: ${url}`);
          const body = Buffer.concat(chunks);
          rej(body.toString('base64'));
          console.log(`图片转码完毕.`);
        });
      }).end();
    });
  }

  private async parse(node: ImageNode): Promise<Partial<Image>> {
    console.log(`开始解析网站, 编号: ${node.id}`);
    const dom: Document = node.dom;
    const link: string = ((dom.querySelector('.one-imagen>img') as Element).getAttribute('src') || '').trim();
    const image: any = await this.get(link);
    const text: string = ((dom.querySelector('.one-cita') as Element).innerHTML || '').trim();
    const date: number = new Date(
      `${((dom.querySelector('.dom') as Element).innerHTML || '1').trim()} ${((dom.querySelector('.may') as Element).innerHTML || 'Jan 2019').trim()}`
    ).getTime();
    console.log(`网站解析完毕, 编号: ${node.id}`);
    return {
      id: node.id,
      link,
      image,
      text,
      date
    };
  }

  private async save(image: Partial<Image>) {
    if (await Image.findOne({ id: image.id })) {
      console.log(`图片 ${image.id} 已存在, 进行更新操作.`);
      return Image.update({ id: image.id }, image);
    } else {
      return Image.insert(image);
    }
  }

  public async run(id = 1) {
    console.log(`开始执行检索.`);
    let currect = 0;
    const max = 10;
    for (let i = id; i < 2300; i++) {
      if (++currect > max) {
        await this
          .getHTML(i)
          .then(v => this.parse(v))
          .then(v => this.save(v))
          .then(v => console.log(`图片已经保存至数据库, 编号 ${i}.`))
          .catch(r => console.error(`出现错误, 图片可能不存在, 编号: ${i}. ${r}`))
          .finally(() => console.log(`当前任务数: ${--currect}`));
      } else {
        this
          .getHTML(i)
          .then(v => this.parse(v))
          .then(v => this.save(v))
          .then(v => console.log(`图片已经保存至数据库, 编号 ${i}.`))
          .catch(r => console.error(`出现错误, 图片可能不存在, 编号: ${i}. ${r}`))
          .finally(() => console.log(`当前任务数: ${--currect}`));
      }
    }
  }

  public async test(id = 2307) {
    await this
      .getHTML(id)
      .then(v => this.parse(v))
      .then(v => this.save(v))
      .then(v => console.log(`图片已经保存至数据库, 编号 ${id}`))
      .catch(r => console.error(`出现错误, 图片可能不存在. ${r}`));
  }

}

export default ImageCrawler;
