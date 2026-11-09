const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");
const { User, Blog, ReadingList } = require("../models");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");

  if (!authorization || !authorization.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "token missing" });
  }

  try {
    req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "token invalid" });
  }
};

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

router.put("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const { read } = req.body;
    const readingListEntry = await ReadingList.findByPk(req.params.id);

    if (!readingListEntry) {
      return res.status(404).json({ error: "Reading list entry not found" });
    }

    if (readingListEntry.userId !== req.decodedToken.id) {
      return res.status(403).json({ error: "Only the owner can update this reading list entry" });
    }

    readingListEntry.read = read;
    await readingListEntry.save();

    res.json(readingListEntry);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
