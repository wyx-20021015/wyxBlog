const errDev = async (ctx, next) => {
  try {
    console.log("in errdev---");
    await next();
  } catch (e) {
    console.log(e);
    ctx.body = e;
  }
};
module.exports = {
  errDev,
};
