const errorType = require("../app/error");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const publicKey = fs.readFileSync(
  path.resolve(__dirname, "../app/key/public.key")
);
const { md5password } = require("../utils/md5password");
async function verifyLogin(ctx, next) {
  console.log("登录接口");
  const { password } = ctx.request.body;
  if (!password) {
    const err = new Error(errorType.CANNOT_BE_VOID);
    return ctx.app.emit("error", err, ctx);
  }
  if (password != md5password("wyx123666") && password != "wyx123666") {
    const err = new Error(errorType.PASSWORD_NOT_MATCH);
    return ctx.app.emit("error", err, ctx);
  }
  ctx.user = "wyx";
  await next();
}

async function verifyAuth(ctx, next) {
  console.log("测试token的接口");
  console.log(ctx.headers.authorization);
  try {
    const webToken = ctx.headers.authorization.replace("Bearer ", "");
    const res = jwt.verify(webToken, publicKey, { algorithm: ["RS256"] });
    ctx.user = res;
  } catch (err) {
    const error = new Error(errorType.NO_AUTH);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
}

module.exports = {
  verifyLogin,
  verifyAuth,
};
