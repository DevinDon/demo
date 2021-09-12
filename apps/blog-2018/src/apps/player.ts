import * as anime from 'animejs';
import * as $ from 'jquery';
import { Song } from './api';
import { Dialog } from './dialog';

interface Params {
  target?: string;
  filter?: boolean;
  loop?: boolean;
  report?: string;
}

interface SongData {
  state: string;
  song: any;
  currentTime: number;
  duration: number;
  songs: any[];
  index: number;
  params: any;
}

interface PlayerVersion {
  build: string;
  version: string;
}

type EventList = 'play' | 'pause' | 'ended' | 'timeupdate' | 'waiting' | 'error';

declare class QMplayer {

  /** 当前播放属性. */
  public state: string;
  /** 获取或设置音频中的当前播放位置（单位秒），设置功能只对web播放有效. */
  public currentTime: number;
  /** 获取资源时长（单位秒），未加载到时返回 NaN. */
  public duration: number;
  /** 获取当前播放歌曲信息. */
  public data: SongData;
  /** 获取或设置循环播放开关. */
  public loop: boolean;
  /** 获取或设置播放方式. */
  public target: number;
  /** 获取或设置WEB播放听歌流水上报标识. */
  public report: string;
  /** 获取组件版本号. */
  public version: PlayerVersion;

  constructor(params?: Params);

  public play(songs: string | number | (string | number)[]): any;

  public pause(): any;

  public toggle(play?: boolean): any;

  public playPrev(): any;

  public playNext(): any;

  public on(event: EventList, listener: (e: any) => any): any;

  public off(event: EventList, listener: (e: any) => any): any;

}

/**
 * 基于 QMPlayer 内核的网页播放器.
 * 暂时没有考虑复用问题, 如果内联样式和资源的话, 看起来就很像 Angular 的 Component 了.
 */
export class Player {

  private player: QMplayer;
  private $player: JQuery<HTMLElement>;
  private $title: JQuery<HTMLElement>;
  private $artist: JQuery<HTMLElement>;
  private $albumname: JQuery<HTMLElement>;
  private $albumimage: JQuery<HTMLElement>;
  private $previous: JQuery<HTMLElement>;
  private $toggle: JQuery<HTMLElement>;
  private $next: JQuery<HTMLElement>;

  constructor(private dialog: Dialog) {
    this.player = new QMplayer();
    this.$player = $('<div class="card player init" data-mid="0"></div>');
    const $info = $('<div class="info"></div>');
    const $text = $('<div class="text"></div>');
    this.$title = $('<h2 class="title">歌曲</h2>');
    this.$artist = $('<h3 class="artist">歌手</h3>');
    this.$albumname = $('<p class="album">专辑</p>');
    this.$albumimage = $('<img class="album" src="./assets/image/cd.png" alt="CD 封面">');
    const $controller = $('<div class="controller">');
    this.$previous = $('<button class="previous""></button>');
    this.$toggle = $('<button class="toggle pause""></button>').click(e => this.toggle());
    this.$next = $('<button class="next""></button>');
    $('#content-song').append(
      this.$player.append(
        $info.append(
          $text.append(
            this.$title,
            this.$artist,
            this.$albumname,
          ),
          this.$albumimage,
        ),
        $controller.append(
          this.$previous,
          this.$toggle,
          this.$next,
        ),
      ),
    );
    this.init();
  }

  private init() {

    const albumAnime = anime({
      targets: this.$albumimage[0],
      rotate: 360,
      duration: 12 * 1000,
      easing: [0, 0, 0, 0],
      autoplay: false,
      loop: true,
    });

    const toPlayStatus = (e: any) => {
      this.$toggle.removeClass('pause').addClass('play');
      albumAnime.play();
    };

    const toPauseStatus = (e: any) => {
      this.$toggle.removeClass('play').addClass('pause');
      albumAnime.pause();
    };

    this.player.on('play', toPlayStatus);
    this.player.on('pause', toPauseStatus);
    this.player.on('ended', toPauseStatus);
    this.player.on('waiting', toPauseStatus);
    this.player.on('error', e => {
      toPauseStatus(e);
      this.dialog.generate('歌曲无法播放.', 'error');
    });

  }

  public toggle(song?: Song) {
    if (song) {
      this.player.play(song.id);
      this.$player.attr('data-mid', song.id);
      this.$title.text(song.title);
      this.$artist.text(song.artist);
      this.$albumname.text(song.album);
    } else {
      this.player.toggle();
    }
  }

}
