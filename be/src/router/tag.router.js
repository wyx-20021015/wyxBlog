const Router = require("koa-router");

const router = new Router({ prefix: "/tag" });

const { verifyAuth } = require("../middleware/auth.middleware");
const { getAllTags } = require("../middleware/tag.middleware");

//获取全部标签
router.get("/", getAllTags);

module.exports = router;
