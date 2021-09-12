import * as anime from 'animejs';
import * as $ from 'jquery';

/** 对话框相关. */
export class Dialog {

  /** 编号. */
  private no = 0;
  /** 对话框区域. */
  private area: HTMLDivElement;

  constructor() {
    this.area = document.getElementById('dialog-area') as HTMLDivElement;
  }

  /** 设置网页暗色遮罩层. */
  public toggleFull() {
    this.area.classList.contains('full')
      ? this.area.classList.remove('full')
      : this.area.classList.add('full');
    return this;
  }

  /** 向页面中添加一个自定义弹框. */
  public add(target: JQuery<HTMLElement>) {
    $(this.area).append(target);
    // 修复监听器的无限添加
    target[0].onclick = async () => {
      await anime({
        targets: target[0],
        opacity: [1, 0],
        duration: 500,
        easing: 'easeInOutSine',
      }).finished;
      this.clear();
      this.toggleFull();
    };
    return target;
  }

  public clear() {
    $(this.area).children().remove();
    return this;
  }

  /**
   * 在页面上生成一个对话框.
   * @param text 对话框文本.
   * @param type 对话框类型.
   */
  public generate(html: string, type: 'info' | 'warning' | 'error' = 'info'): HTMLDivElement {
    const n = ++this.no;
    const dialog = document.createElement('div');
    // 设置 ID
    dialog.id = `dialog-${n}`;
    // 添加样式
    dialog.classList.add('dialog', type);
    // 设置内容
    dialog.innerHTML = html;
    // 添加至页面中
    this.area.append(dialog);
    // 动画进入及退出, 并从页面中移除
    anime.timeline({
      direction: 'direction',
      complete: () => this.remove(`dialog-${n}`),
    }).add({
      targets: `#dialog-${n}`,
      translateX: ['20rem', 0],
      opacity: [0, 1],
      duration: 1000,
    }).add({
      targets: `#dialog-${n}`,
      translateX: [0, '20rem'],
      opacity: [1, 0],
      duration: 1000,
      offset: '+=4000',
      easing: 'easeInExpo',
    });
    return dialog;
  }

  /**
   * 从页面中移除指定的 dialog.
   * @param id dialog ID.
   */
  public remove(id: string): HTMLElement | undefined {
    const removed = document.getElementById(id);
    if (removed) {
      this.area.removeChild(removed);
      return removed;
    } else {
      return undefined;
    }
  }

}
