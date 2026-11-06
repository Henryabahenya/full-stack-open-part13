const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  // You can customize handling for specific database or validation errors here if needed
  res.status(400).json({ error: err.message })
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
  errorHandler,
  unknownEndpoint
}
