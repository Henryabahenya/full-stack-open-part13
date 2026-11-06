const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: err.errors.map(e => e.message) })
  }

  res.status(400).json({ error: err.message })
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
  errorHandler,
  unknownEndpoint
}
