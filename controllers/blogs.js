const router = require('express').Router()
const { Blog, User } = require('../models')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      include: {
        model: User,
        attributes: ['username', 'name']
      }
    })
    res.json(blogs)
  } catch (err) {
    next(err)
  }
})

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    if (!user) {
      return res.status(404).json({ error: 'user not found' })
    }
    const blog = await Blog.create({ ...req.body, userId: user.id })
    res.status(201).json(blog)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }

    if (blog.userId !== req.decodedToken.id) {
      return res.status(403).json({ error: 'Only the creator can delete this blog' })
    }

    await blog.destroy()
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
      blog.likes = req.body.likes
      await blog.save()
      res.json(blog)
    } else {
      res.status(404).json({ error: 'Blog not found' })
    }
  } catch (err) {
    next(err)
  }
})

router.module = router
module.exports = router
