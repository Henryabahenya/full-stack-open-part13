const app = require("./app");
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");
require("./models"); // loads associations

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
