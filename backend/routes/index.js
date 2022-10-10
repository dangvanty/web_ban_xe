const user = require('./user.router')
const product = require('./product.router')
const order = require('./order.route')

function routes(app) {
  app.use('/api/v1', user)
  app.use('/api/v1', product)
  app.use('/api/v1', order)
}
module.exports = routes
