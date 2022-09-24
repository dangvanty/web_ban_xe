const catchAsyncErrors = require('../middleware/catchAsyncError')
const User = require('../models/user.model')

// test
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body
  const user = await User.create({
    name,
    email,
    password,
  })
  res.json({ user })
})
