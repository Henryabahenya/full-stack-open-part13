require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const main = async () => {
  try {
    console.log('Executing (default): SELECT * FROM blogs')
    const result = await pool.query('SELECT * FROM blogs')
    
    result.rows.forEach((blog) => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
    })
    
    await pool.end()
  } catch (err) {
    console.error('Error connecting to the database:', err)
  }
}

main()
