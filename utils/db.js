const { Pool } = require('pg')
const { DATABASE_URL } = require('./config')

const pool = new Pool({
  connectionString: DATABASE_URL,
})

const connectToDatabase = async () => {
  try {
    await pool.query('SELECT 1')
    console.log('Connected to the database successfully')
  } catch (err) {
    console.error('Failed to connect to the database', err)
    process.exit(1)
  }
}

module.exports = {
  pool,
  connectToDatabase
}
