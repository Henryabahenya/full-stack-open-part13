const Sequelize = require("sequelize");
const { DATABASE_URL, TEST_DATABASE_URL } = require("./config");

const isTesting = process.env.TESTING === "true";
const databaseUrl = isTesting ? TEST_DATABASE_URL : DATABASE_URL;

if (!databaseUrl) {
  const envVarName = isTesting ? "TEST_DATABASE_URL" : "DATABASE_URL";
  throw new Error(
    `Database connection URL is undefined. Set ${envVarName} before starting the app.`,
  );
}

const sequelize = new Sequelize(databaseUrl, {
  dialectOptions: {},
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database with Sequelize successfully");
  } catch (err) {
    console.log("Failed to connect to the database", err);
    return process.exit(1);
  }
};

module.exports = {
  connectToDatabase,
  sequelize,
};
