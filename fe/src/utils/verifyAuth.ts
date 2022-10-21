import { NavigationGuardWithThis } from "vue-router"
import Token from "./token"
const { getToken } = Token
import router from "../router"
const verifyAuth: NavigationGuardWithThis<void> = (to, from, next) => {
  if (!getToken()) {
    next(false)
    router.push({ name: "login" }).then(() => alert("请先登录!"));
    return
  };
  next(true)
  return
}
export default verifyAuth