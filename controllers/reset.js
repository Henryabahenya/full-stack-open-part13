const router = require('express').Router()
const { Blog, User } = require('../models')

router.post('/', async (req, res) => {
  await Blog.destroy({ truncate: { cascade: true } })
  await User.destroy({ truncate: { cascade: true } })
  res.status(204).end()
})

module.exports = router
