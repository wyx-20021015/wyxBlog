const {
  getArticleById,
  getArticleByOffset,
  deleteArticleById,
  patchArticleById,
  postArticle,
  findArticleByTag,
  search,
} = require("../service/article.service.js");
const {
  ARTICLE_CANNOTBE_VOID,
  DIGEST_CANNOTBE_VOID,
  TITLE_CANNOTBE_VOID,
} = require("../app/error");

const errType = require("../app/error");

const getArticle = (opt) => {
  if (opt == 1) {
    return async (ctx, next) => {
      const { offset } = ctx.query;
      if (offset <= 0) {
        const err = new Error("offset must be a positive number");
        ctx.app.emit("error", err, ctx);
      }
      try {
        const res = await getArticleByOffset(offset);
        ctx.data = res;
      } catch (e) {
        if (e.message === "post is not enough") {
          const err = new Error(errType.NO_MORE_ARTICLE);
          return ctx.app.emit("error", err, ctx);
        }
        const err = new Error(errType.UNKNOWN_ERROR);
        return ctx.app.emit("error", err, ctx);
      }

      await next();
    };
  }
  if (opt == 2) {
    return async (ctx, next) => {
      const { id } = ctx.params;
      let res;
      try {
        res = await getArticleById(id);
      } catch (e) {
        console.log(e);
        const err = new Error(errType.GET_ARTICLE_FAILED);
        return ctx.app.emit("error", err, ctx);
      }
      ctx.data = res;
      await next();
    };
  }
};

const deleteArticle = async (ctx, next) => {
  const { id } = ctx.params;
  try {
    const res = await deleteArticleById(id);
    ctx.data = res;
  } catch (e) {
    const err = new Error(errType.DELETE_ARTICLE_FAILED);
    return ctx.app.emit("error", err, ctx);
  }
  await next();
};

const updateArticle = async (ctx, next) => {
  const { id } = ctx.params;
  const req = ctx.request.body;
  console.log(req);
  req.tags = req.tags.map((t) => {
    if (t.name === undefined) return t.trim();
    else return t.name.trim();
  });
  const { content, digest, title, tags } = req;
  if (!content) {
    const error = new Error(ARTICLE_CANNOTBE_VOID);
    return ctx.app.emit("error", error, ctx);
  }
  if (!digest) {
    const error = new Error(DIGEST_CANNOTBE_VOID);
    return ctx.app.emit("error", error, ctx);
  }
  if (!title) {
    const error = new Error(TITLE_CANNOTBE_VOID);
    return ctx.app.emit("error", error, ctx);
  }
  try {
    const res = await patchArticleById({ id, content, digest, title, tags });
    ctx.data = res;
  } catch (e) {
    const err = new Error(errType.ARTICLE_UPDATE_WRONG);
    return ctx.app.emit("error", err, ctx);
  }
  await next();
};

const createArticle = async (ctx, next) => {
  const req = ctx.request.body;
  req.tags = req.tags.map((t) => {
    if (t.name === undefined) return t.trim();
    else return t.name.trim();
  });
  const { content, digest, title, tags } = req;
  if (!content) {
    const error = new Error(ARTICLE_CANNOTBE_VOID);
    return ctx.app.emit("error", error, ctx);
  }
  if (!digest) {
    const error = new Error(DIGEST_CANNOTBE_VOID);
    return ctx.app.emit("error", error, ctx);
  }
  if (!title) {
    const error = new Error(TITLE_CANNOTBE_VOID);
    return ctx.app.emit("error", error, ctx);
  }
  const res = await postArticle({ content, digest, title, tags });
  await next();
};

const getArticleByTag = async (ctx, next) => {
  let { tagName } = ctx.params;
  if (tagName === undefined) {
    const err = new Error("must give a tagId");
    ctx.app.emit("error", err, ctx);
  }
  tagName = tagName.trim();
  if (tagName === undefined) {
    const err = new Error("tag id cannot be void");
    ctx.app.emit("error", err, ctx);
  }
  let { offset } = ctx.query;
  offset = parseInt(offset);
  if (offset <= 0 || offset === undefined || typeof offset != "number") {
    const err = new Error("offset must be a positive number");
    ctx.app.emit("error", err, ctx);
  }
  try {
    const res = (await findArticleByTag(tagName, offset)) || [];
    ctx.data = res;
  } catch (e) {
    console.log(e);
  }

  await next();
};
const searchArticle = async (ctx, next) => {
  let { q, offset } = ctx.query;
  if (q === undefined) {
    const err = new Error("must give a query value");
    ctx.app.emit("error", err, ctx);
  }
  q = q.trim();
  if (offset <= 0) {
    const err = new Error("offset must be a positive number");
    ctx.app.emit("error", err, ctx);
  }
  if (q.length === 0) {
    const err = new Error("cannot query a void value");
    ctx.app.emit("error", err, ctx);
  }
  const res = await search(q, offset);
  ctx.data = res;
  await next();
};

module.exports = {
  getArticle,
  deleteArticle,
  updateArticle,
  createArticle,
  getArticleByTag,
  searchArticle,
};
