const Router = require("koa-router");

const { login, hasAuth } = require("../controller/auth.controller");

const { verifyLogin, verifyAuth } = require("../middleware/auth.middleware");

const router = new Router({ prefix: "/login" });
router.post("/", verifyLogin, login);
router.get("/", verifyAuth, hasAuth);
module.exports = router;
