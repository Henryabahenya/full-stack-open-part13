const router = require("express").Router();
const { Blog, User } = require("../models");
const { Op } = require("sequelize");
const { tokenExtractor } = require("../utils/middleware");

router.get("/", async (req, res, next) => {
  try {
    let where = {};
    if (req.query.search) {
      where = {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
          {
            author: {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
        ],
      };
    }

    const blogs = await Blog.findAll({
      where,
      order: [["likes", "DESC"]],
      include: {
        model: User,
        attributes: ["username", "name"],
      },
    });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    const blog = await Blog.create({ ...req.body, userId: user.id });
    res.status(201).json(blog);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    if (blog.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Only the creator can delete this blog" });
    }

    await blog.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (blog) {
      blog.likes = req.body.likes;
      await blog.save();
      res.json(blog);
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
