const { model, Schema } = require("mongoose");

const { tagSchema } = require("./tag.service");

const { Tag } = require("./tag.service");

const postSchema = new Schema(
  {
    title: String,
    digest: String, //摘要
    content: String,
    tags: { type: [tagSchema], default: () => [] },
    visited: { type: Number, default: 0 },
  },
  { versionKey: false }
);

const Post = model("Post", postSchema);
async function getArticleByOffset(offset) {
  const post = await Post.find({}, [
    "title",
    "digest",
    "tags",
    "_id",
    "visited",
  ])
    .skip((offset - 1) * 8)
    .limit(8)
    .exec()
    .catch((e) => console.log(e));
  if (!post.length) throw new Error("post is not enough");
  return post;
}
async function getArticleById(id) {
  const post = await Post.findById(id)
    .exec()
    .catch((e) => console.log(e));
  if (!post) {
    throw new Error();
  }

  post.visited++;
  post.save({ timestamps: false });
  return post;
}
async function patchArticleById({ id, content, digest, title, tags }) {
  // todo:当tag减至0，应该删掉tag
  console.log(id, content, digest, title, tags);
  const post = await Post.findById(id)
    .exec()
    .catch((e) => null);
  if (!post) throw new Error();
  //报错
  post.content = content;
  post.title = title;
  post.digest = digest;

  // console.log("# updatePost", post);

  const oldTagNames = new Set(post.tags.map((t) => t.name));
  const newTagNames = new Set(tags);
  const deletedTagNames = [...oldTagNames].filter((e) => !newTagNames.has(e));
  const addedTagNames = [...newTagNames].filter((e) => !oldTagNames.has(e));

  // 找到文章 tag 中已有的部分
  const existingTags = await Tag.find({
    name: {
      $in: [...newTagNames],
    },
  });
  // 找到全新添加的 tag
  const nonExistingTagNames = [...newTagNames].filter(
    (name) => !existingTags.find((tag) => tag.name === name)
  );
  // 创建新的 tag
  const createdTags = await Tag.insertMany(
    nonExistingTagNames.map((name) => ({ name, count: 0 }))
  );

  post.tags = [
    ...createdTags.map((t) => {
      t.count = 1;
      return t;
    }),
    ...existingTags,
  ];
  await post.save();

  //#region 更新 tag 库的 count
  const bulk = Tag.collection.initializeUnorderedBulkOp();
  bulk
    .find({
      name: {
        $in: deletedTagNames,
      },
    })
    .update({ $inc: { count: -1 } });
  bulk
    .find({
      name: {
        $in: addedTagNames,
      },
    })
    .update({ $inc: { count: 1 } });
  bulk.execute();
  //#endregion
  return;
}

async function postArticle({ content, digest, title, tags }) {
  //添加投稿接口
  //tags already exist
  const existingTags =
    (await Tag.find({
      name: {
        $in: tags,
      },
    })) || [];
  // 找到新添加的 tag
  const newTagNames = tags.filter(
    (name) => !existingTags.find((tag) => tag.name === name)
  );

  const newTags = await Tag.insertMany(newTagNames.map((name) => ({ name })));
  const tagInObj = tags.map((name) => ({ name }));
  const newPost = new Post({
    title,
    digest,
    content,
    tags: tagInObj,
  });
  // 设置用过的每个 tag 的使用次数 ++
  const bulk = Tag.collection.initializeUnorderedBulkOp();
  bulk
    .find({
      name: {
        $in: existingTags.map((t) => t.name),
      },
    })
    .update({ $inc: { count: 1 } })
    .execute();
  // console.log(tagInObj);
  try {
    await newPost.save();
  } catch (e) {
    console.log(e);
  }
}
async function deleteArticleById(id) {
  const post = await Post.findById(id);
  try {
    const tags = post.tags.map((tag) => tag.name);
    const bulk = Tag.collection.initializeUnorderedBulkOp();
    bulk
      .find({
        name: {
          $in: tags,
        },
      })
      .update({ $inc: { count: -1 } })
      .execute();

    post.delete();
  } catch (e) {
    console.log(e);
  }

  return "ok";
}
const findArticleByTag = async (tagName, offset) => {
  const res = await Post.find({ "tags.name": tagName })
    .skip((offset - 1) * 8)
    .limit(8)
    .exec()
    .catch((e) => console.log(e));
  console.log(res);
  return res;
};

const search = async (q, offset) => {
  const kwReg = new RegExp(`${q}`, "i");
  const posts = await Post.find({
    $or: [{ digest: kwReg }, { title: kwReg }, { "tags.name": kwReg }],
  })
    .skip((offset - 1) * 8)
    .limit(8)
    .exec()
    .catch((e) => console.log(e));
  return posts;
};

module.exports = {
  postArticle,
  patchArticleById,
  Post,
  deleteArticleById,
  getArticleByOffset,
  getArticleById,
  findArticleByTag,
  search,
};
