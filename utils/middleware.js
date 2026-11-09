const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");
const { Session, User } = require("../models");

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (!authorization || !authorization.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "token missing" });
  }

  const token = authorization.substring(7);

  try {
    req.decodedToken = jwt.verify(token, SECRET);
  } catch {
    return res.status(401).json({ error: "token invalid" });
  }

  const session = await Session.findOne({
    where: { token },
    include: [{ model: User }],
  });

  if (!session) {
    return res.status(401).json({ error: "session expired or invalid" });
  }

  if (session.user.disabled) {
    return res.status(401).json({ error: "user disabled" });
  }

  req.user = session.user;
  next();
};

const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    return res.status(400).json({ error: err.errors.map((e) => e.message) });
  }

  res.status(400).json({ error: err.message });
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

module.exports = {
  tokenExtractor,
  errorHandler,
  unknownEndpoint,
};
