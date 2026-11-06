const router = require('express').Router()
const { pool } = require('../utils/db')

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs')
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM blogs WHERE id = $1 RETURNING *', [id])
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    
    res.status(204).end()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { likes } = req.body

    const result = await pool.query(
      'UPDATE blogs SET likes = $1 WHERE id = $2 RETURNING *',
      [likes, id]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Blog not found' })
    }

    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
