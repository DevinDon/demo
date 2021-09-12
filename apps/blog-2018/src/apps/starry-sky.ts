/** 立体坐标, Z 轴保留. */
export interface XYZ {
  x: number;
  y: number;
  z: number;
}

/** 星星属性. */
interface Star {
  /** 位置, 以左上角为定位点. */
  position: XYZ;
  /** 尺寸, 以位置为左上角向其他方向拓展. */
  size: XYZ;
  /** 移动速度及方向, 每个方向独立计算, 单位: 像素每帧 (pixel per frame) */
  speed: XYZ;
  /** 颜色, HEX 表示. */
  color: string;
}

/** 星空. */
export class StarrySky {

  /** 画布元素. */
  private canvas: HTMLCanvasElement;
  /** 渲染上下文. */
  private context: CanvasRenderingContext2D;
  /** 星星数组. */
  private stars: Star[] = [];
  /** Animation handle. */
  private handle = 0;
  /** 鼠标位置. */
  private cursor: XYZ = { x: 0, y: 0, z: 0 };

  /** 创建一个星空画布, 并绘制上星星. */
  constructor(canvasID: string) {
    try {
      this.canvas = document.getElementById(canvasID) as HTMLCanvasElement;
      this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    } catch (err) {
      alert(`未找到 ID 为 ${canvasID} 的画布, 绘制失败.`);
      throw err;
    }
    this.init();
  }

  /** 初始化. */
  private init(): void {
    this.stars = this.randomStars();
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
    this.generateBackground();
    // 窗口尺寸改变时重绘画布
    window.onresize = () => {
      this.canvas.width = innerWidth;
      this.canvas.height = innerHeight;
      this.generateBackground();
    };
    // 实时获取鼠标坐标
    window.onmousemove = (e: MouseEvent) => {
      this.cursor.x = e.clientX;
      this.cursor.y = e.clientY;
    };
    // 点击按钮后在当前位置生成一个星星, 并移除最早的星星
    window.onclick = (e: MouseEvent) => {
      this.stars.shift();
      this.stars.push(this.randomStar({ x: e.clientX, y: e.clientY, z: 0 }));
    };
    this.start();
  }

  /**
   * 绘制某个星星.
   * @param v 星星.
   * @returns 移动后的星星.
   */
  private drawStar(v: Star): Star {
    this.context.fillStyle = v.color;
    this.context.fillRect(v.position.x, v.position.y, v.size.x, v.size.y);
    /** 星星与鼠标的距离. */
    const distance: number = Math.round(Math.abs(v.position.x - this.cursor.x) + Math.abs(v.position.y - this.cursor.y));
    // 绘制星星与鼠标的连线
    if (distance < 256) {
      // 距离越远, 颜色越淡
      this.context.strokeStyle = `#000000${0xff - distance < 0x10 ? '0' : ''}${(0xff - distance).toString(16)}`;
      this.context.lineWidth = 3;
      this.context.beginPath();
      this.context.moveTo(v.position.x, v.position.y);
      this.context.lineTo(this.cursor.x, this.cursor.y);
      this.context.closePath();
      this.context.stroke();
    }
    // 碰撞检测, 到边缘时自动弹回
    (v.position.x + v.speed.x > innerWidth || v.position.x + v.speed.x < 0)
      ? v.speed.x = -v.speed.x
      : v.position.x += v.speed.x;
    (v.position.y + v.speed.y > innerHeight || v.position.y + v.speed.y < 0)
      ? v.speed.y = -v.speed.y
      : v.position.y += v.speed.y;
    return v;
  }

  /** 绘制背景. */
  private generateBackground(): void {
    this.context.fillStyle = '#fdfdfd';
    this.context.fillRect(0, 0, innerWidth, innerHeight);
  }

  /**
   * 生成一个星星.
   * @returns 返回生成的星星.
   */
  private randomStar(position?: XYZ): Star {
    const size: number = Math.ceil(Math.random() * 4) + 3;
    return {
      position: position || {
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        z: 0,
      },
      size: {
        x: size,
        y: size,
        z: 0,
      },
      speed: {
        x: (Math.random() * 0.75 + 0.25) * (Math.random() > 0.5 ? -1 : 1),
        y: (Math.random() * 0.75 + 0.25) * (Math.random() > 0.5 ? -1 : 1),
        z: 0,
      },
      color: `#363636${Number(Math.floor(Math.random() * 0x7f) + 0x3f).toString(16)}`,
    };
  }

  /**
   * 生成指定数量的随机星星.
   * @param amount 生成数量, 默认为 50.
   * @returns 生成的星星数组.
   */
  private randomStars(amount = 50): Star[] {
    const result: Star[] = [];
    for (let j = amount; j > 0; j--) {
      result.push(this.randomStar());
    }
    return result;
  }

  /**
   * 重绘整个星空.
   * @param time 时间.
   * @returns Animation handle.
   */
  private redraw(time: number): void {
    // 清除画布
    this.context.clearRect(0, 0, innerWidth, innerHeight);
    // 重绘背景
    this.generateBackground();
    // 处理星星轨迹
    this.stars = this.stars.map(this.drawStar.bind(this));
    // Animation handle
    this.handle = requestAnimationFrame(this.redraw.bind(this));
  }

  /** 开始绘制星空. */
  public start(): void {
    this.handle = requestAnimationFrame(this.redraw.bind(this));
  }

  /** 暂停绘制星空. */
  public stop(): void {
    window.cancelAnimationFrame(this.handle);
  }

}
