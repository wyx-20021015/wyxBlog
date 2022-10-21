import { ArticleData } from '../../types/ArticleData';
import { httpRes } from '../../types/httpRes';
import wRequest from '../index';
export const getArticleByOffset = async (offset: string, tag: string, id: string): Promise<httpRes<Array<ArticleData>>> => {
  if (tag === undefined && id === undefined)
    return wRequest.get({ url: "/article", params: { offset } })
  else if (id === undefined)
    return wRequest.get({ url: `/article/tag/${tag}`, params: { offset } })
  else
    return wRequest.get({ url: `article/detail/${id}` })
}
export async function getArticleById(id: string): Promise<httpRes<ArticleData>> {
  return await wRequest.get({ url: `/article/detail/${id}` })
}
export async function createArticle(data: ArticleData) {
  return wRequest.post({ url: `/article`, data })
}
export async function updateArticle(data: ArticleData) {
  return wRequest.patch({ url: `/article/detail/${data._id}`, data })
}
export async function deleteArticle(id: string) {
  return wRequest.delete({ url: `article/detail/${id}` })
}