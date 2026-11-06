const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    // add any ssl or specific options if needed
  },
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected to the database with Sequelize successfully')
  } catch (err) {
    console.error('Failed to connect to the database', err)
    process.exit(1)
  }
}

module.exports = {
  sequelize,
  connectToDatabase
}
