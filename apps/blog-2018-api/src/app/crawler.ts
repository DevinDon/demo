import * as ArticleCrawler from './parse/ArticleCrawler';
import ImageCrawler from './parse/ImageCrawler';

export const crawl = () => {

  setTimeout(() => {
    const imagec = new ImageCrawler();
    imagec.run(0);
    ArticleCrawler.run(0);
  }, 5000);

};
