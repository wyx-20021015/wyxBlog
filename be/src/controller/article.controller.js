class articleController {
  async success(ctx, next) {
    // ctx.body = "操作成功";
    await next();
  }
}
module.exports = new articleController();
