const Router = require("koa-router");

const router = new Router({ prefix: "/article" });

const { success } = require("../controller/article.controller");
const { verifyAuth } = require("../middleware/auth.middleware");
const {
  getArticle,
  createArticle,
  deleteArticle,
  updateArticle,
  getArticleByTag,
  searchArticle,
} = require("../middleware/article.middleware");

const { errDev } = require("../app/errDev");
router.get("/", getArticle(1), success);

router.post("/", verifyAuth, createArticle, success);

router.get("/detail/:id", getArticle(2), success);
router.delete("/detail/:id", verifyAuth, deleteArticle, success);
router.patch("/detail/:id", verifyAuth, updateArticle, success);

router.get("/tag/:tagName", getArticleByTag);
router.get("/search", searchArticle);
module.exports = router;
