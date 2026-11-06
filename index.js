require('dotenv').config()
const { Pool } = require('pg')
const express = require('express')

const app = express()
app.use(express.json())

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// GET all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs')
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// POST a new blog
app.post('/api/blogs', async (req, res) => {
  try {
    const { author, url, title, likes } = req.body
    const result = await pool.query(
      'INSERT INTO blogs (author, url, title, likes) VALUES ($1, $2, $3, $4) RETURNING *',
      [author, url, title, likes || 0]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
