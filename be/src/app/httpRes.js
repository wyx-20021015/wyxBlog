// export declare interface httpRes<T = any> {
//   status: number;
//   msg: string;
//   data: T;
//   success:boolean
// }

const httpRes = async (ctx, next) => {
  let res = {};
  let data = ctx.data || ctx.body;
  if (ctx.fail === true || ctx.status === 400) {
    const { status, msg } = ctx;
    res = { status, msg, data: null, success: false };
  } else {
    const status = 200;
    let { msg } = ctx;
    if (!msg) msg = "请求成功";
    if (!data) data = "ok";
    res = { status, msg, data, success: true };
  }
  ctx.body = res;
  console.log(ctx.body);
};
module.exports = { httpRes };
