import * as anime from 'animejs';
import * as $ from 'jquery';
import { API, Article, Image, Song } from './api';
import { Dialog } from './dialog';
import { Player } from './player';
import { StarrySky, XYZ } from './starry-sky';

/** 标题类型 */
type Title = 'home' | 'article' | 'image' | 'song' | 'about' | 'blog';
/** 对应中文名称. */
type Name = '首页' | '文字' | '时刻' | '声音' | '关于' | '窗台';

interface APPError {
  code: number;
  message?: string;
}

interface PageElement {
  name: Name;
  nav: HTMLLinkElement;
  section: HTMLElement;
}

interface Content {
  home: PageElement;
  article: PageElement;
  image: PageElement;
  song: PageElement;
  about: PageElement;
  blog: PageElement;
  [index: string]: PageElement;
}

interface Page {
  /** 页面标题元素. */
  title: HTMLElement;
  /** 座右铭. */
  motto: HTMLElement;
  /** 工具箱. */
  toolbox: HTMLElement;
}

/** 应用核心, 用于页面控制. */
export class APP {

  /** 错误: 不支持本地访问. */
  public static ERRORNOTSUPPORTLOCAL = 1;

  /** API 服务. */
  private api: API;
  /** 对话框管理. */
  public dialog: Dialog;
  /** 星空背景. */
  public starrysky: StarrySky;
  /** 播放器. */
  public player: Player;

  /** 页面内容. */
  private content: Content;
  /** 页面标题. */
  private page: Page;
  /** 当前页面. */
  private currectPage: Title = 'blog';

  private prefix: '' | 'blog' | 'blog-2018';

  /**
   * 生成一个单页应用管理器.
   */
  constructor() {
    this.dialog = new Dialog();
    this.starrysky = new StarrySky('background');
    this.player = new Player(this.dialog);
    if (location.hostname === 'localhost') { // localhost
      this.prefix = '';
      this.api = new API(this.dialog);
    } else if (location.hostname === 'demo.don.red') { // demo.don.red
      this.prefix = 'blog';
      this.api = new API(this.dialog, 'api/v1');
    } else if (location.hostname === 'devindon.github.io') { // GitHub page
      this.prefix = 'blog-2018';
      this.api = new API(this.dialog, 'https://demo.don.red/blog/api/v1');
    } else {
      this.prefix = '';
      this.api = new API(this.dialog);
    }
    this.content = {
      home: {
        name: '首页',
        nav: document.getElementById('link-home') as HTMLLinkElement,
        section: document.getElementById('content-home') as HTMLElement,
      },
      article: {
        name: '文字',
        nav: document.getElementById('link-article') as HTMLLinkElement,
        section: document.getElementById('content-article') as HTMLElement,
      },
      image: {
        name: '时刻',
        nav: document.getElementById('link-image') as HTMLLinkElement,
        section: document.getElementById('content-image') as HTMLElement,
      },
      song: {
        name: '声音',
        nav: document.getElementById('link-song') as HTMLLinkElement,
        section: document.getElementById('content-song') as HTMLElement,
      },
      about: {
        name: '关于',
        nav: document.getElementById('link-about') as HTMLLinkElement,
        section: document.getElementById('content-about') as HTMLElement,
      },
      blog: {
        name: '窗台',
        nav: document.getElementById('notexist') as HTMLLinkElement,
        section: document.getElementById('notexist') as HTMLElement,
      },
    };
    this.page = {
      title: document.getElementById('page-title') as HTMLElement,
      motto: document.getElementById('header-motto') as HTMLElement,
      toolbox: document.getElementById('toolbox') as HTMLElement,
    };
    this.init();
  }

  /** 滚动. */
  public static scrollTo(
    end: XYZ = {
      x: 0,
      y: 0,
      z: 0,
    },
    position: XYZ = {
      x: pageXOffset,
      y: pageYOffset,
      z: 0,
    },
  ) {
    return anime({
      targets: position,
      x: end.x,
      y: end.y,
      z: end.z,
      duration: 1000,
      easing: 'easeInOutSine',
      run: () => scrollTo(position.x, position.y),
    }).finished;
  }

  /** 定时器任务. */
  private async init() {
    try {
      await this.welcome();
      this.changeMotto();
      this.listeningLocalRoute();
    } catch (err) {
      const e: APPError = err;
      if (e.code === APP.ERRORNOTSUPPORTLOCAL) {
        new Dialog()
          .clear()
          .toggleFull()
          .add(
            $(`
<div style="text-align: center; font-size: larger; color: black; filter: invert(100%);">
  <h1>核心路由不支持使用文件协议 file: 访问.</h1>
  <p><a href="https://demo.don.red/blog">请连接至网络后查看在线样例.</a></p>
  <p><a href="http://localhost:8080">或启动本地服务器后访问 http://localhost:8080</a></p>
</div>
          `),
          )[0].onclick = () => undefined;
      }
    }
  }

  /** 进入动画. */
  private async welcome() {
    return anime({
      targets: 'html',
      opacity: [0, 1],
      translateY: ['-10rem', 0],
      duration: 1500,
      easing: 'easeInOutSine',
      complete: () => $('html').removeAttr('style'),
    }).finished;
  }

  /** 定时切换座右铭. */
  private async changeMotto() {
    anime.timeline({
      complete: this.changeMotto.bind(this),
    }).add({
      targets: this.page.motto,
      opacity: 0,
      duration: 1000,
      easing: 'easeInOutSine',
      complete: () => this.page.motto.innerText = this.api.getRandomMotto().text,
    }).add({
      targets: this.page.motto,
      opacity: 1,
      duration: 1000,
      easing: 'easeInOutSine',
      offset: '+=1000',
    }).add({
      targets: this.page.motto,
      duration: 7000,
    });
  }

  /** 监听本地路由. */
  private listeningLocalRoute() {
    if (location.origin.split(':')[0] === 'file') {
      throw {
        code: APP.ERRORNOTSUPPORTLOCAL,
        message: '核心路由不支持本地访问.',
      };
    }
    const url: string[] = location.pathname.split('/').filter(v => v).filter(v => v !== this.prefix);
    // 当前页面刷新, 或从站外链接进入, 重新导航至本页
    if (url.length) {
      const page: Title = url[0] as Title;
      const param: string[] = url.slice(1);
      this.active(page, param);
    } else {
      // 否则导航至首页
      this.active('home');
    }
    // 为所有的本地路由链接添加监听事件
    document
      .querySelectorAll('a[data-router]')
      .forEach(element => {
        const path = element.getAttribute('data-router');
        const page: Title = (path && path.split('/').filter(v => v)[0]) as Title || 'home';
        const param: string[] = path && path.split('/').filter(v => v).slice(1) || [];
        (element as HTMLLinkElement).onclick = () => this.active(page, param);
      });
    window.onpopstate = (e: PopStateEvent) => {
      if (e.state) {
        this.active(e.state.page || 'home', e.state.param);
      } else {
        this.active('home');
      }
    };
  }

  /** 设置当前页面内容. */
  public async setCards(page?: Title) {
    // 首先回到顶部
    APP.scrollTo({ x: 0, y: 0, z: 0 });
    /** 当前页面. */
    page = page || this.currectPage;
    /** 设置当前页面 ID. */
    const id = `#content-${page}`;
    /** 获取 content. */
    const $content = $(id);
    /** 当前页面的 Loading 元素. */
    const $loading = $content.find('.loading');
    // 加载时服务器资源时的动画
    anime
      .timeline()
      .add({ // 隐藏 card
        targets: `${id}>.card:not(.init)`,
        opacity: [1, 0],
        duration: 500,
        easing: 'easeInOutSine',
        complete: () => $content.children(':not(.init)').remove(), // 移除所有其他元素
      })
      .add({ // 显示 loading
        targets: $loading[0],
        begin: () => $loading.removeClass('hide'),
        opacity: [0, 1],
        duration: 500,
        easing: 'easeInOutSine',
      });
    /** 资源. */
    let resource: Article[] | Image[] | Song[] | any[];
    /** card. */
    let $cards: JQuery<HTMLElement>[] = [];
    switch (page) {
      case 'article':
        resource = await this.api.getArticles();
        $cards = await this.generateArticleCards(resource);
        break;
      case 'image':
        resource = await this.api.getImages();
        $cards = await this.generateImageCards(resource);
        break;
      case 'song':
        resource = await this.api.getSongs();
        $cards = await this.generateSongCards(resource);
        break;
      default:
        resource = [];
        $cards = [];
        break;
    }
    // 隐藏 loading
    await anime({
      targets: $loading[0],
      opacity: [1, 0],
      duration: 500,
      easing: 'easeInOutSine',
      complete: () => $loading.addClass('hide'),
    }).finished;
    // 将生成的 card 载入页面中
    $content.append($cards);
    // 显示 card
    anime({
      targets: `${id}>.card:not(.init)`,
      opacity: [0, 1],
      duration: 500,
      easing: 'easeInOutSine',
    });
  }

  /**
   * 生成文章卡片.
   * @param articles 文章内容.
   */
  private async generateArticleCards(articles: Article[]): Promise<JQuery<HTMLElement>[]> {
    const $cards: JQuery<HTMLElement>[] = [];
    for (const article of articles) {
      const $card = $('<div class="card"></div>');
      const $title = $(`<h2 class="title">${article.title}</h2>`);
      const $author = $(`<h3 class="author">作者 / ${article.author}</h3>`);
      const $hrup = $('<hr class="up">');
      const $summary = $(`<p class="summary">${article.summary}</p>`);
      const $text = $(`<article class="text hide">${article.html}</article>`);
      const $hrdown = $('<hr class="down">');
      const $copyright = $(`<p class="copyright"><a href="http://wufazhuce.com/article/${article.id}">ONE 一个 版权所有</a></p>`);
      $card.click(async e => {
        if ($text[0].contains(e.target)) {
          return;
        }
        const text = $card.find('article');
        // 滚动至文章标题处
        APP.scrollTo({ x: 0, y: $card[0].offsetTop, z: 0 });
        if (text.hasClass('hide')) { // 如果未展开文章, 隐藏其他卡片, 展开当前文章
          text.removeClass('hide');
          await anime({
            targets: text[0],
            opacity: [0, 1],
            height: [0, '100vh'],
            duration: 500,
            easing: 'easeInOutSine',
            complete: () => text.css('height', 'fit-content'),
          }).finished;
        } else { // 如果当前文章已展开, 则收起文章并显示其他卡片
          await anime({
            targets: text[0],
            begin: () => text.css('height', text.css('height')),
            opacity: [1, 0],
            height: 0,
            duration: 500,
            easing: 'easeInOutSine',
            complete: () => text.addClass('hide'),
          }).finished;
        }
      });
      $card.append(
        $title,
        $author,
        $hrup,
        $summary,
        $text,
        $hrdown,
        $copyright,
      );
      $cards.push($card);
    }
    return $cards;
  }

  /**
   * 生成图片卡片.
   * @param images 图片内容.
   */
  private async generateImageCards(images: Image[]): Promise<JQuery<HTMLElement>[]> {
    const $cards: JQuery<HTMLElement>[] = [];
    let index = -1;
    for (const image of images) {
      index++;
      const $card = $(`<div class="card${(index % 4 === 0 || index % 4 === 3) ? ' large' : ' small'}"></div>`);
      const $date = $(`<h2 class="date">${new Date(Number(image.date)).toLocaleDateString()}</h2>`);
      const $hrup = $('<hr class="up">');
      const $img = $(`<img src="data:image/png;base64,${image.image}" alt="${image.text}">`);
      const $text = $(`<p class="text">${image.text}</p>`);
      const $hrdown = $('<hr class="down">');
      const $copyright = $(`<p class="copyright"><a href="http://wufazhuce.com/one/${image.id}">ONE 一个 版权所有</a></p>`);
      $card.append(
        $date,
        $hrup,
        $img,
        $text,
        $hrdown,
        $copyright,
      );
      const card = $card.clone().addClass('dialog');
      $card.click(() => {
        // 全屏暗色背景层
        this.dialog.toggleFull();
        this.dialog.add(card);
        anime({
          targets: card[0],
          opacity: [0, 1],
          duration: 500,
          easing: 'easeInOutSine',
        });
      });
      $cards.push($card);
    }
    return $cards;
  }

  /**
   * 生成歌曲卡片.
   * @param songs 歌曲内容.
   */
  private async generateSongCards(songs: Song[]): Promise<JQuery<HTMLElement>[]> {
    const $table = $('<table class="card"></table>');
    const $thead = $(`
    <thead>
        <tr>
          <td class="title">歌曲</td>
          <td class="artist">作者</td>
          <td class="album">专辑</td>
          <td class="time">时长</td>
          <td class="control">播放</td>
        </tr>
      </thead>
    `);
    const $tbody = $('<tbody></tbody>');
    const $tfoot = $('<tfoot></tfoot>');
    for (const song of songs) {
      const $tr = $(`
      <tr>
          <td class="title">${song.title}</td>
          <td class="artist">${song.artist}</td>
          <td class="album">${song.album}</td>
          <td class="time">${song.time}</td>
          <td class="control">播放</td>
        </tr>
      `);
      $tr.children('.control').click(e => {
        this.player.toggle(song);
      });
      $tbody.append($tr);
    }
    $table.append(
      $thead,
      $tbody,
      $tfoot,
    );
    return [$table];
  }

  public refresh() {
    this.setCards();
  }

  /**
   * 切换到指定页面.
   * @param page 指定页面.
   */
  public async active(page: Title, param: string[] = []) {
    // 如果要切换的页面是当前页面, 取消执行
    if (page === this.currectPage) {
      return false;
    } else if (page !== 'about' && page !== 'article' && page !== 'home' && page !== 'image' && page !== 'song') {
      this.active('home');
      return true;
    }
    // 否则执行切换
    /** 先前标签页. */
    const previous = this.content[this.currectPage];
    /** 目标标签页. */
    const currect = this.content[this.currectPage = page];
    // 重置标题
    document.title = `窗台 - ${currect.name}`;
    // 切换地址栏
    history.pushState({ time: Date.now(), page, param }, document.title, `${this.prefix ? '/' + this.prefix : ''}/${page}${param.length ? '/' + param.join('/') : ''}`);
    // 首次加载数据
    if (
      (page === 'article' || page === 'image' || page === 'song') && !$(`#content-${page}`).hasClass('init')
    ) {
      $(`#content-${page}`).addClass('init');
      this.setCards();
    }
    // 切换标题
    anime.timeline()
      .add({
        targets: this.page.title,
        opacity: 0,
        translateY: '-10vh',
        duration: 500,
        easing: 'easeInOutSine',
        complete: () => this.page.title.innerHTML = `<a>${currect.name}</a>`,
      }).add({
        targets: this.page.title,
        opacity: 1,
        translateY: 0,
        offset: '+=300',
        duration: 500,
        easing: 'easeInOutSine',
      });
    // 切换标签状态
    previous.nav.classList.remove('active');
    currect.nav.classList.add('active');
    // 隐藏先前页面内容
    await anime({
      targets: previous.section,
      translateX: [0, '10vw'],
      opacity: 0,
      duration: 500,
      easing: 'easeInOutSine',
    }).finished;
    previous.section.style.display = 'none';
    // 显示目的页面内容
    currect.section.style.display = 'flex';
    await anime({
      targets: currect.section,
      translateX: ['-10vw', 0],
      opacity: 1,
      delay: 300,
      duration: 500,
      easing: 'easeInOutSine',
    });
    this.page.toolbox.setAttribute('class', page);
    return true;
  }

}
