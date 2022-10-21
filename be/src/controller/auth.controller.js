const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../app/key/private.key")
);
class authController {
  async login(ctx, next) {
    const user = "wyx";
    let webToken;
    try {
      webToken = jwt.sign({ user }, privateKey, {
        expiresIn: "30days",
        algorithm: "RS256",
      });
    } catch (e) {
      console.log(e);
    }
    console.log("颁发token完成");
    ctx.body = { webToken };
    await next();
  }
  async hasAuth(ctx, next) {
    ctx.body = `登录成功`;
    await next();
  }
}
module.exports = new authController();
