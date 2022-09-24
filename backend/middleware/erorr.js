const ErrorHandler = require('../utils/errorhander')

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.message = err.message || 'Không thành công'

  //wrong mongodb id errors
  if (err.name === 'CastError') {
    const message = `Không tìm thấy: ${err.path}`
    err = new ErrorHandler(message, 400)
  }
}
