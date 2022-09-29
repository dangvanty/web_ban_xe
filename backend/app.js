const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')
const fileUpload = require('express-fileupload')
const errorMiddleware = require('./middleware/erorr')

if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({ path: 'backend/config/config.env' })
}
// support post API
app.use(express.json({ limit: '50mb' }))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(fileUpload())
// call router
routes(app)
app.use('/', (req, res) => {
  res.send('hello world')
})

//middleware for error

app.use(errorMiddleware)

module.exports = app
