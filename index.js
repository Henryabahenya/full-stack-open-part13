const app = require('./app')
const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')
require('./models') // loads associations
const { sequelize } = require('./utils/db')

const start = async () => {
  await connectToDatabase()
  await sequelize.sync()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
