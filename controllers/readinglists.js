const router = require("express").Router();
const { User, Blog, ReadingList } = require("../models");

router.post("/", async (req, res, next) => {
  try {
    const { blogId, userId } = req.body;

    if (!blogId || !userId) {
      return res.status(400).json({ error: "blogId and userId are required" });
    }

    const user = await User.findByPk(userId);
    const blog = await Blog.findByPk(blogId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const existing = await ReadingList.findOne({
      where: { userId, blogId },
    });

    if (existing) {
      return res.status(400).json({ error: "Blog already in reading list" });
    }

    const readingListEntry = await ReadingList.create({
      userId,
      blogId,
      read: false,
    });
    res.status(201).json(readingListEntry);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
