const errorHandler = (err, req, res, next) => {
  const statusCode = err.sttausCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error"
  })
}

module.exports = errorHandler