import * as anime from 'animejs';
import * as $ from 'jquery';
import { APP } from './app';

let app: APP;

window.onload = () => {
  app = new APP();
  $('#content-home > p').mouseenter(() => {
    const $art = $('#article-home');
    if ($art.hasClass('busy')) {
      return;
    }
    $art.addClass('busy');
    if ($art.hasClass('show')) {
      // 隐藏
      anime({
        targets: $art[0],
        duration: 1500,
        height: [475.81, 0],
        opacity: [1, 0],
        easing: 'easeInOutCirc',
        complete: () => $art.removeClass('show').removeClass('busy'),
      });
    } else {
      // 展开
      anime({
        targets: $art[0],
        duration: 1500,
        height: [0, 475.81],
        opacity: [0, 1],
        easing: 'easeInOutCirc',
        complete: () => $art.addClass('show').removeClass('busy'),
      });
    }
  });
  $('#toolbox > div:nth-child(1)').click(() => APP.scrollTo({ x: 0, y: 0, z: 0 }));
  $('#toolbox > div:nth-child(2)').click(() => app.refresh());
  $('#toolbox > div:nth-child(3)').click(() => APP.scrollTo({ x: 0, y: document.body.offsetHeight, z: 0 }));
  $('#content-about>div.where>div:nth-child(1)').click(e => {
    app.dialog.generate('Meow~ Here is my GitHub~<br>我住在 GitHub 这里.', 'warning');
  });
  $('#content-about>div.where>div:nth-child(2)').click(e => {
    app.dialog.generate('You found my email address!<br>给我发一封邮件试试呀.', 'info');
  });
  $('#content-about>div.where>div:nth-child(3)').click(e => {
    app.dialog.generate('Ah, is this not a 404 website?<br>你可能到不了这里.', 'error');
  });
  $('#content-about>div.where>div:nth-child(4)').click(e => {
    app.dialog.generate('That is myself!<br>点开看看在线例子, 好像没什么不一样.', 'info');
  });
};
