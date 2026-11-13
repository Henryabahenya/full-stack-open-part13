const express = require("express");
const { errorHandler, unknownEndpoint } = require("./utils/middleware");
const app = express();

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const logoutRouter = require("./controllers/logout");
const authorsRouter = require("./controllers/authors");
const resetRouter = require("./controllers/reset");
const readingListsRouter = require("./controllers/readinglists");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/reset", resetRouter);
app.use("/api/readinglists", readingListsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
