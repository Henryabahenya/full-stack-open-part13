const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { Session } = require("../models");
const { SECRET } = require("../utils/config");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
      next();
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
};

router.delete("/", tokenExtractor, async (req, res, next) => {
  try {
    const token = req.headers.authorization.substring(7);
    const session = await Session.findOne({
      where: { token },
    });

    if (!session) {
      return res.status(401).json({ error: "session expired or invalid" });
    }

    await Session.destroy({ where: { userId: req.decodedToken.id } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
