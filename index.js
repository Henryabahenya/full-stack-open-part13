const app = require('./app')
const { PORT } = require('./utils/config')
const { connectToDatabase, sequelize } = require('./utils/db')
require('./models/user')
require('./models/blog')

const start = async () => {
  await connectToDatabase()
  await sequelize.sync() // creates/syncs tables including timestamps
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
