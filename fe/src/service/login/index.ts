import { httpRes } from '../../types/httpRes';
import Token from "../../utils/token"
const { setToken } = Token
import wRequest from '../index';
import md5 from 'js-md5';
type webToken = {
  webToken: string;
}
export const login = async (password: string) => {
  password = md5(password);
  const res = await wRequest.post<webToken>({ url: `/login`, data: { password } })
  console.log(res)
  if (res.success = true) {
    console.log(res.data.webToken)
    setToken(res.data.webToken)
  }
  return res
}