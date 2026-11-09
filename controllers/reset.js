const router = require("express").Router();
const { Blog, User, ReadingList, Session } = require("../models");

router.post("/", async (req, res) => {
  if (process.env.TESTING !== "true") {
    return res
      .status(403)
      .json({ error: "reset is only allowed in testing mode" });
  }

  await ReadingList.destroy({ truncate: { cascade: true } });
  await Session.destroy({ truncate: { cascade: true } });
  await Blog.destroy({ truncate: { cascade: true } });
  await User.destroy({ truncate: { cascade: true } });

  res.status(204).end();
});

module.exports = router;
