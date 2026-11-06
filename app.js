const express = require('express')
const app = express()

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorsRouter = require('./controllers/authors')
const resetRouter = require('./controllers/reset')

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('OK')
})

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/reset', resetRouter)

module.exports = app
