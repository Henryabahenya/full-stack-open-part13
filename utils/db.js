const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {},
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected to the database with Sequelize successfully')
  } catch (err) {
    console.log('Failed to connect to the database', err)
    return process.exit(1)
  }
}

module.exports = {
  connectToDatabase,
  sequelize
}
