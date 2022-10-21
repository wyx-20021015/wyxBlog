const errorTypes = require("./error");
const { httpRes } = require("./httpRes.js");

handleError = (err, ctx) => {
  let status, message;
  switch (err.message) {
    case errorTypes.CANNOT_BE_VOID:
      status = 400;
      message = "user or password cannot be void";
      break;
    case errorTypes.NAME_ALREADY_USED:
      status = 400;
      message = "name has already be used";
      break;
    case errorTypes.NAME_NOT_CREATED:
      status = 401;
      message = "用户名未注册";
      break;
    case errorTypes.PASSWORD_NOT_MATCH:
      status = 400;
      message = "用户名与密码不匹配";
      break;
    case errorTypes.NO_AUTH:
      status = 400;
      message = "请先登录";
      break;
    default:
      status = 400;
      message = err.message || "404 not found";
  }
  ctx.status = status;
  ctx.msg = message;
  ctx.fail = true;
  ctx.success = false;
  httpRes(ctx);
};
module.exports = {
  handleError,
};
