/** 文章. */
export interface InterfaceArticle {
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

/**
 * 请求封装包, 主题内容为泛型.
 */
export interface Req<T = string> {
  id: number;
  key: string;
  content: T;
}

/**
 * 响应封装包, 主体内容类型为泛型.
 */
export interface Resp<T = string> {
  id: number;
  status: boolean;
  content: T;
}

export interface LocalConfig {
  static?: string;
}
