const { model, Schema } = require("mongoose");

const tagSchema = new Schema(
  {
    name: { type: String, default: "defaultTag" },
    count: { type: Number, default: 1 },
  },
  { versionKey: false }
);

const Tag = model("Tag", tagSchema);

const findAllTags = async () => {
  return Tag.find({}) || [];
};
module.exports = {
  findAllTags,
  Tag,
  tagSchema,
};
