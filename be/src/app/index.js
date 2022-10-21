const { APP_PORT } = require("./config.js");
const useRoutes = require("../router/index");
const { handleError } = require("./handleError");
const { httpRes } = require("./httpRes");
const cors = require("koa2-cors");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const setupMongo = require("./database");
setupMongo();
const app = new Koa();
app.use(cors());
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  await next();
});

app.use(bodyParser());

useRoutes(app);
app.on("error", handleError);
app.use(httpRes);
module.exports = {
  app,
  APP_PORT,
};
