const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./reading_list");

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, {
  through: ReadingList,
  as: "readings",
  foreignKey: "userId",
  otherKey: "blogId",
});

Blog.belongsToMany(User, {
  through: ReadingList,
  as: "readingUsers",
  foreignKey: "blogId",
  otherKey: "userId",
});

module.exports = {
  Blog,
  User,
  ReadingList,
};
