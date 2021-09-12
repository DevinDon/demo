import axios from 'axios';
import { Dialog } from './dialog';

/** 响应内容. */
interface Resp<T = string> {
  /** 数据包编号. */
  id: number;
  /** 业务逻辑标识, 非 HTTP 响应码. */
  status: boolean;
  /** 响应主体. */
  content: T;
}

/** 座右铭. */
interface Motto {
  id: number;
  author: string;
  text: string;
}

/** 文章. */
export interface Article {
  /** 编号. */
  id: number;
  /** 标题. */
  title: string;
  /** 作者. */
  author: string;
  /** 日期, date.getTime(). */
  date: number;
  /** 摘要. */
  summary: string;
  /** 正文. */
  text: string;
  /** HTML 文档. */
  html: string;
}

/** 图片数据.  */
export interface Image {
  id: number;
  link: string;
  image: string;
  text: string;
  date: number;
}

/** 音乐数据. */
export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  time: number;
}

/** 离线资源. */
interface Offline {
  articles: Article[];
  images: Image[];
  mottos: Motto[];
  songs: Song[];
}

/** API 相关. */
export class API {

  private offline: Offline;

  constructor(
    private dialog: Dialog,
    private server: string = 'v1',
  ) {
    this.offline = {
      articles: [
        {
          id: 16,
          title: '小孩的世界里没有小事',
          author: '王悦微',
          summary: '虫子再小也要分好坏，小孩的世界里没有小事。',
          text: '编者注：这是一名小学老师的教学日志、教学随笔以及她的学生的一篇作文。*教学日志9月12日中午被几个二年级的学生请去做法官，到教室一看，两个男生倒在地上，一个揪着另一个的耳朵，另一个抱着对方的腿，气得面红耳赤。我花了半小时来审案子，原来教室里飞进了一只小虫，一个关窗去夹，想夹死它；另一个认为这是好虫子，不该夹死，就打起来了。虫子再小也要分好坏，小孩的世界里没有小事。9月23日念一年级的时候，有天诗人宇自告奋勇要上台给大家讲个他创编的故事。他说的是章鱼男孩在上学路上遇到章鱼女孩的事，“然后，他们开始握手，他们握了一次又一次，一次又一次，握到上学块迟到了也没握完”，他说，“因为他们是章鱼啊，哈哈哈”。说着，他自己在台上大笑了起来。10月10日 下课时候，小科神秘地冲琪琪笑着，说：“我发现有个成语很适合你！”琪琪用她一贯的大嗓门问道：“是什么？快说！”小科笑嘻嘻地说：“泼妇盛名！”说完转身就逃。*教学随笔给你一颗糖豆我有时觉得我的学生们很像寓言《朝三暮四》里的那几只猴子，需要不断地用栗子来挑起他们的兴致，而且，栗子还得经常变换，不能是同一种栗子。中午在办公室找到了一罐很特别的糖豆，于是就揣在口袋里，打算去逗逗班上的那群小猴子。我说，如果课堂上可以做到安静看书，我将发给他一颗糖豆作为奖励。于是，班级里鸦雀无声，他们都在静静地看书，连几个皮猴子也坐住了。我满意地笑了，然后挑了几个皮猴子上来领糖果。他们欢天喜地地上来，一人挑了一颗自己喜欢的糖果，飞快地丢进嘴巴里，其他学生露出眼馋的神情。这时，有个学生叫道：“怎么这糖有股药的味道啊？”问得好，此话正合我意嘛。我严肃地说：“其实，刚才我给你们的糖果，是有魔力的，它会自动检测出懒人，如果吃了糖果却不认真学习，那么他的脸上就会长出很多青春痘！”台下顿时发出一阵惊呼：“惨了，不会吧？”小孩真是幼稚，都上三年级了，居然也这么好骗。我得意地瞄了瞄他们：“不信？那你们试试看好了。”他们马上规规矩矩地坐好，一个个发奋看书写字画画起来。*小学生作文广告推销作者/仇婷（四年级） 大家好，这里是我们学校的热点推销站，请大家注意收看最新广告。第一款为大家推销的产品，她非常优秀，有两条胳膊两条腿，二十个手指头一个没少，另外还附加长长的头发。那她有什么用呢？欺负男生最管用啦！140cm以下10元一次，150 cm—140 cm15元一次，160 cm以上25元一次，体育老师免谈。她的原则是：先付钱后做事，但不能保证避免光收钱不干事的可能。如果想让她做一些有难度的事情，也是可以的，比如，抽马桶、试卷签名、打架、抓人，样样精通啊。不用说，这也是要收费的，5元一次，8元两次，还可以办理贵宾卡，一律打八折！万一有人忘带东西了，找她去吧，什么三角尺啦，铅笔啦，橡皮啦，样样俱全，免费借，弄坏的话，一赔十哦！这就是今天的热点推销产品，很不错吧？也许你们已经猜到她是谁了。对了，再告诉你们一件事：本广告纯属忽悠！',
          html: '<p class="fr-pspace-a0">编者注：这是一名小学老师的教学日志、教学随笔以及她的学生的一篇作文。</p><p class="fr-pspace-a0"><br></p><p class="fr-pspace-a0"><strong>*教学日志</strong></p><p class="fr-pspace-a0">9月12日</p><p class="fr-pspace-a0">中午被几个二年级的学生请去做法官，到教室一看，两个男生倒在地上，一个揪着另一个的耳朵，另一个抱着对方的腿，气得面红耳赤。我花了半小时来审案子，原来教室里飞进了一只小虫，一个关窗去夹，想夹死它；另一个认为这是好虫子，不该夹死，就打起来了。虫子再小也要分好坏，小孩的世界里没有小事。</p><p class="fr-pspace-a0">9月23日</p><p class="fr-pspace-a0">念一年级的时候，有天诗人宇自告奋勇要上台给大家讲个他创编的故事。他说的是章鱼男孩在上学路上遇到章鱼女孩的事，“然后，他们开始握手，他们握了一次又一次，一次又一次，握到上学块迟到了也没握完”，他说，“因为他们是章鱼啊，哈哈哈”。说着，他自己在台上大笑了起来。</p><p class="fr-pspace-a0">10月10日&nbsp;</p><p class="fr-pspace-a0">下课时候，小科神秘地冲琪琪笑着，说：“我发现有个成语很适合你！”琪琪用她一贯的大嗓门问道：“是什么？快说！”小科笑嘻嘻地说：“泼妇盛名！”说完转身就逃。</p><p class="fr-pspace-a0"><br></p><p class="fr-pspace-a0"><strong>*教学随笔</strong></p><p class="fr-pspace-a0"><strong>给你一颗糖豆</strong></p><p class="fr-pspace-a0">我有时觉得我的学生们很像寓言《朝三暮四》里的那几只猴子，需要不断地用栗子来挑起他们的兴致，而且，栗子还得经常变换，不能是同一种栗子。</p><p class="fr-pspace-a0">中午在办公室找到了一罐很特别的糖豆，于是就揣在口袋里，打算去逗逗班上的那群小猴子。</p><p class="fr-pspace-a0">我说，如果课堂上可以做到安静看书，我将发给他一颗糖豆作为奖励。于是，班级里鸦雀无声，他们都在静静地看书，连几个皮猴子也坐住了。</p><p class="fr-pspace-a0">我满意地笑了，然后挑了几个皮猴子上来领糖果。他们欢天喜地地上来，一人挑了一颗自己喜欢的糖果，飞快地丢进嘴巴里，其他学生露出眼馋的神情。</p><p class="fr-pspace-a0">这时，有个学生叫道：“怎么这糖有股药的味道啊？”</p><p class="fr-pspace-a0">问得好，此话正合我意嘛。</p><p class="fr-pspace-a0">我严肃地说：“其实，刚才我给你们的糖果，是有魔力的，它会自动检测出懒人，如果吃了糖果却不认真学习，那么他的脸上就会长出很多青春痘！”</p><p class="fr-pspace-a0">台下顿时发出一阵惊呼：“惨了，不会吧？”</p><p class="fr-pspace-a0">小孩真是幼稚，都上三年级了，居然也这么好骗。我得意地瞄了瞄他们：“不信？那你们试试看好了。”</p><p class="fr-pspace-a0">他们马上规规矩矩地坐好，一个个发奋看书写字画画起来。</p><p class="fr-pspace-a0"><br></p><p class="fr-pspace-a0"><strong>*小学生作文</strong></p><p class="fr-pspace-a0"><strong>广告推销</strong></p><p class="fr-pspace-a0">作者/仇婷（四年级）&nbsp;</p><p class="fr-pspace-a0">大家好，这里是我们学校的热点推销站，请大家注意收看最新广告。</p><p class="fr-pspace-a0">第一款为大家推销的产品，她非常优秀，有两条胳膊两条腿，二十个手指头一个没少，另外还附加长长的头发。</p><p class="fr-pspace-a0">那她有什么用呢？欺负男生最管用啦！140cm以下10元一次，150 cm—140 cm15元一次，160 cm以上25元一次，体育老师免谈。她的原则是：先付钱后做事，但不能保证避免光收钱不干事的可能。</p><p class="fr-pspace-a0">如果想让她做一些有难度的事情，也是可以的，比如，抽马桶、试卷签名、打架、抓人，样样精通啊。不用说，这也是要收费的，5元一次，8元两次，还可以办理贵宾卡，一律打八折！</p><p class="fr-pspace-a0">万一有人忘带东西了，找她去吧，什么三角尺啦，铅笔啦，橡皮啦，样样俱全，免费借，弄坏的话，一赔十哦！</p><p>这就是今天的热点推销产品，很不错吧？也许你们已经猜到她是谁了。对了，再告诉你们一件事：本广告纯属忽悠！</p>',
          date: Date.now(),
        },
      ],
      images: [
        {
          id: 14,
          link: 'http://image.wufazhuce.com/Fp7L1MIqpBJyGRjbvFulSmjnmPB8',
          text: '是狼是人，日久见心。by 小饭',
          image: 'iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAADoElEQVR4Xu2dS27DMAxEnUvl/utcqkW3BuqBQDLiiK/bSPzMPNO/tH1d/IxW4DW6e5q/AGA4BAAAAMMVGN4+EwAAhiswvH0mAAAMV2B4+0wAABiuwPD2mQDTAXi/3z/DNRjd/gsARvt/AcBs/wFguP8AAABcBI5mgGuA0fZfnAKG+68B+Hw+PCwypkTd5stTAAAYu39dFwB4+xeuHgDCEnoHKAdAJbifQqrXe9uVX73SO3wNoBIAQL6pKxGVPwCwoqbhWgAwNC2zZADIVNMwFgAYmpZZMgBkqmkYCwAMTcssuRyAzGKJla8AAORrahURAKzsyi8WAPI1tYoYBsCqW4pdVkA+Cl6OyAYrBQDAyq78YgEgX1OriABgZVd+sQCQr6lVRACwsiu/WADI19QqIt/5t7Irv1gAyNfUKiIAWNmVXywA5GtqFREArOzKLxYA8jW1iggAVnblFwsA+ZpaRQQAK7vWi5VfCFkPyQ4nBQDAya2CWgGgQFSnkBIAtUD9iRi1v1qsbvWpeqr1uMdX/si3gaohlaC64W71qXqq9QCAmwLfBhQAvoy4EhwAnv8dAKeAZGAVkMnpZDh1AACAlHBtAQCs6RVerQRXR0C4gFsAVU92PhVP9c8EUAoufg4AyUeEIrib4Iu8lC9X+pVPgKhBqoFo/HIHNidQ+gHAZoOq0wNAtcLN4wNAc4OqywOAaoWbxweA5gZVlwcA1Qo3jz8eACVAc/9keeo2WPV//G2gEkAq3HwBAIj/agYAm18HK0LVAaYMVPHVfpW/++fR/jkFdHdY1AcAnAIef7lHTUAmABPg+SIhOmLUfqW/IljFV/tV/u6fR/s/fgJ0N7C6PnUAAEC1A5vjA8BmA3anB4DdDmzODwCbDdidHgB2O7A5PwBsNmB3egDY7cDm/NsBqO4/+iCkur7q+NH+y58DdBegur7q+ADAy6DeL4O6HwHV9VXHZwIwAZgAT0eZugquPkKr4zMBmABMACbA/wqoCRi+DaweccSPKQAAMf3sdwOAvYWxBgAgpp/9bgCwtzDWAADE9LPfDQD2FsYaAICYfva7AcDewlgDABDTz343ANhbGGsAAGL62e8OA2CvAA08KiBfBqHf2QoAwNn+yu4AQEp09gIAONtf2R0ASInOXgAAZ/sruwMAKdHZCx6/UXp263T3pwAADOcAAABguALD22cCAMBwBYa3zwQAgOEKDG+fCQAAwxUY3j4TAACGKzC8/V84dG0OroozDAAAAABJRU5ErkJggg==',
          date: 1350230400000,
        },
      ],
      mottos: [
        {
          id: 1,
          author: '',
          text: '大道虽简, 知易行难.',
        },
      ],
      songs: [
        {
          id: 140265,
          time: 258,
          title: '祝我生日快乐 Panasonic广告原曲',
          artist: '温岚',
          album: '温式效应',
        },
      ],
    };
    this.getMottos({ amount: 10 })
      .then(mottos => mottos.length && (this.offline.mottos = mottos));
  }

  /** 获取一篇随机文章. */
  public getRandomArticle(): Article {
    return this.offline.articles[Math.floor(Math.random() * this.offline.articles.length)];
  }

  /** 获取一张随机图片. */
  public getRandomImage(): Image {
    return this.offline.images[Math.floor(Math.random() * this.offline.images.length)];
  }

  /** 获取一句随机座右铭. */
  public getRandomMotto(): Motto {
    return this.offline.mottos[Math.floor(Math.random() * this.offline.mottos.length)];
  }

  /** 获取一首随机歌曲. */
  public getRandomSong(): Song {
    return this.offline.songs[Math.floor(Math.random() * this.offline.songs.length)];
  }

  private catchAPIError(message = '网络错误'): any[] {
    this.dialog.generate(message, 'error');
    return [];
  }

  /**
   * 获取若干篇文章.
   * @param options 条件, 若为空则获取随机的 6 篇文章.
   */
  public async getArticles(options?: Partial<Article>): Promise<Article[]> {
    return axios
      .post<Resp<Article[]>>(`${this.server}/articles`, { params: options })
      .then(v => v.data.content)
      .catch(r => this.catchAPIError('服务器错误, 无法获取文章.'))
      .then(v => v.length ? v : [
        this.getRandomArticle(),
        this.getRandomArticle(),
        this.getRandomArticle(),
        this.getRandomArticle(),
        this.getRandomArticle(),
        this.getRandomArticle(),
      ]);
  }

  /**
   * 获取随机的若干张图片.
   * @param options 条件, 若为空则获取随机的 6 张图片.
   */
  public async getImages(options?: Partial<Image>): Promise<Image[]> {
    return axios
      .post<Resp<Image[]>>(`${this.server}/images`, { params: options })
      .then(v => v.data.content)
      .catch(r => this.catchAPIError('服务器错误, 无法获取图片.'))
      .then(v => v.length ? v : [
        this.getRandomImage(),
        this.getRandomImage(),
        this.getRandomImage(),
        this.getRandomImage(),
        this.getRandomImage(),
        this.getRandomImage(),
      ]);
  }

  /**
   * 获取随机的若干条格言.
   * @param options 条件, 若为空则获取随机的 10 条格言.
   */
  public async getMottos(options?: any): Promise<Motto[]> {
    return axios
      .post<Resp<Motto[]>>(`${this.server}/mottos`, { param: options })
      .then(v => v.data.content)
      .catch(r => this.catchAPIError('服务器错误, 无法获取格言.'))
      .then(v => v.length ? v : [
        this.getRandomMotto(),
        this.getRandomMotto(),
        this.getRandomMotto(),
        this.getRandomMotto(),
        this.getRandomMotto(),
        this.getRandomMotto(),
      ]);
  }

  /**
   * 获取随机的若干首音乐.
   * @param options 条件, 若为空则获取随机的 6 首音乐.
   */
  public async getSongs(options?: Partial<Song>): Promise<Song[]> {
    return axios
      .post<Resp<Song[]>>(`${this.server}/songs`, { params: options })
      .then(v => v.data.content)
      .catch(r => this.catchAPIError('服务器错误, 无法获取音乐.'))
      .then(v => v.length ? v : [
        this.getRandomSong(),
        this.getRandomSong(),
        this.getRandomSong(),
        this.getRandomSong(),
        this.getRandomSong(),
        this.getRandomSong(),
      ]);
  }

}
