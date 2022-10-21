export declare interface httpRes<T = any> {
  status: number;
  msg: string;
  data: T;
  success: boolean
}
