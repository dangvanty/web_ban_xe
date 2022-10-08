const user = require('./user.router')
const product = require('./product.router')
function routes(app) {
  app.use('/api/v1', user)
  app.use('/api/v1', product)
}
module.exports = routes
