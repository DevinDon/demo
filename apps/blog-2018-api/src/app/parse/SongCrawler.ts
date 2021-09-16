import { JSDOM } from 'jsdom';
import Crawler, { DOM } from './Crawler';
import Song from '../entity/song.entity';
import { readFileSync } from 'fs';

export class SongCrawler extends Crawler {

  constructor() {
    super();
  }

  protected async fetch(url: string): Promise<DOM> {
    const document: string = readFileSync('./test.html').toString();
    console.log(document);
    return {
      id: 123,
      url,
      doc: new JSDOM(document).window.document,
    };
  }

  protected async parse(data: DOM): Promise<Partial<Song>[]> {
    console.log(`开始解析文档: ${data.url}`);
    const doc = data.doc;
    console.log(doc, doc.textContent);
    const mids: number[] = [];
    doc.querySelectorAll('li[mid]').forEach(
      v => mids.push(
        Number(v.getAttribute('mid')),
      ),
    );
    console.log(doc.querySelectorAll('li[mid]'));
    const titles: string[] = [];
    doc.querySelectorAll('a.js_song[title]').forEach(
      v => titles.push(
        v.getAttribute('title') as string,
      ),
    );
    const artists: string[] = [];
    doc.querySelectorAll('div.songlist__artist').forEach(
      v => artists.push(
        v.getAttribute('title') as string,
      ),
    );
    const albums: string[] = [];
    doc.querySelectorAll('div.album_name').forEach(
      v => albums.push(
        (v.getAttribute('title') as string).trim(),
      ),
    );
    const times: number[] = [];
    doc.querySelectorAll('div.songlist__time').forEach(
      (v, i) => v.innerHTML
        .trim()
        .split('.')
        .reverse()
        .forEach(
          (n, j) => times[i] = (times[i] || 0) + Number(n) * Math.pow(60, j),
        ),
    );
    const result: Partial<Song>[] = [];
    for (let i = 0; i < mids.length; i++) {
      result.push({
        id: mids[i],
        title: titles[i],
        artist: artists[i],
        album: albums[i],
        time: times[i],
      });
    }
    console.log(`文档解析完毕: ${data.url}`);
    console.log(result);
    return result;
  }

  protected async save(data: Partial<Song>[]): Promise<boolean> {
    for (const song of data) {
      Song.findOne(song.id)
        .then(v => {
          if (v) {
            Song.update({ id: v.id }, song);
          } else {
            Song.insert(song);
          }
        });
    }
    return true;
  }

}

export default SongCrawler;
