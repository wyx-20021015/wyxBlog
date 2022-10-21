import { tag } from "./tag"
export declare interface ArticleData {
  title: string;
  tags: Array<tag>;
  visited?: Number;
  digest: string;
  _id?: string;
  content?: string;
}
