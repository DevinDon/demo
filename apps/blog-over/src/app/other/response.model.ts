export interface BaseResponse<T = any> {
  status: boolean;
  message?: string;
  content: T;
}

export interface Motto {
  id: number;
  author?: string;
  content: string;
}
