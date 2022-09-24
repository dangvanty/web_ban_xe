const user = require('./user.router')

function routes(app) {
  app.use('/api/v1', user)
}
module.exports = routes
