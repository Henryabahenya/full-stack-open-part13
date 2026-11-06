const router = require('express').Router()
const User = require('../models/user')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // password can be ignored even if sent in request body
    const { username, name } = req.body
    const user = await User.create({ username, name })
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.params.username } })
    if (user) {
      user.name = req.body.name
      await user.save() // ensures updatedAt timestamp updates correctly
      res.json(user)
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
