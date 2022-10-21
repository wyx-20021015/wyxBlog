import wRequest from "../index";
import { httpRes } from "../../types/httpRes"
import { Tag } from "../../types/tag"
const getAllTags = async () => {
  const res = await wRequest.get<Promise<httpRes<Array<Tag>>>>({ url: "/tag" })
  return res.data
}
export {
  getAllTags
}