const router = require("express").Router();
const { User, Blog } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog,
        attributes: { exclude: ["userId"] },
      },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const where = {};
    if (req.query.read !== undefined) {
      where.read = req.query.read === "true";
    }

    const user = await User.findByPk(req.params.id, {
      include: {
        model: Blog,
        as: "readings",
        attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
        through: {
          as: "readingList",
          attributes: ["id", "read"],
          where,
        },
      },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
