const catchAsyncErrors = require('../middleware/catchAsyncError')
const User = require('../models/user.model')
const cloudinary = require('cloudinary')
const sendToken = require('../utils/jwtToken')
const ErrorHander = require('../utils/errorhander')
//Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'avatars',
    width: 150,
    crop: 'scale',
    public_id: `${Date.now()}`,
    resource_type: 'auto',
  })
  const { name, email, password } = req.body
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  })

  sendToken(user, 201, res)
})

// login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body

  //check if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander('Vui lòng nhập Email và mật khẩu', 400))
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return next(new ErrorHander('Email hoặc mật khẩu không đúng', 401))
  }

  const isPassMatched = await user.comparePassword(password)
  if (!isPassMatched) {
    return next(new ErrorHander('Email hoặc mật khẩu không đúng', 401))
  }

  sendToken(user, 200, res)
})

//get user detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  res.status(200).json({
    success: true,
    user,
  })
})

// logout user

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expries: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: 'Logged Out',
  })
})
