const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { User, Session } = require("../models");
const { SECRET } = require("../utils/config");

router.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({
    where: { username },
  });

  if (!user || user.disabled) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  if (user.passwordHash) {
    const bcrypt = require("bcrypt");
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!passwordCorrect) {
      return response.status(401).json({
        error: "invalid username or password",
      });
    }
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);
  await Session.create({ userId: user.id, token });

  response
    .status(200)
    .json({ token, username: user.username, name: user.name });
});

module.exports = router;
