const { findAllTags } = require("../service/tag.service");
const getAllTags = async (ctx, next) => {
  const tags = (await findAllTags()) || [];
  ctx.data = tags;
  await next();
};
module.exports = {
  getAllTags,
};
