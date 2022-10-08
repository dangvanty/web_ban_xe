const catchAsyncErrors = require('../middleware/catchAsyncError')
const User = require('../models/user.model')
const cloudinary = require('cloudinary')
const sendToken = require('../utils/jwtToken')
const ErrorHander = require('../utils/errorhander')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
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

//Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(new ErrorHander('Kiểm tra lại email của bạn!', 404))
  }

  // Get ResetPassword Token

  const resetToken = user.getResetPasswordToken()

  await user.save({ validateBeforeSave: false })

  const resetPasswordUrl = `https://localhost:3000/password/reset/${resetToken}`

  const message = `Link reset mật khẩu của bạn là: \n\n ${resetPasswordUrl} \n\n Nếu bạn không cần email này thì vui lòng bỏ qua nó.`

  try {
    await sendEmail({
      email: user.email,
      subject: `Khôi phục mật khẩu tài khoản ở Tuoi Hoa website`,
      message,
    })

    res.status(200).json({
      success: true,
      message: `Email đã được gửi tới ${user.email} thành công`,
    })
  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save({ validateBeforeSave: false })

    return next(new ErrorHander(error.message, 500))
  }
})

//reset password:

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
    return next(
      new ErrorHander(
        'Token mật khẩu khôi phục không có sẵn hoặc đã bị hết hạn',
        400,
      ),
    )
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander('Mật khẩu xác nhận không phải', 400))
  }

  await user.save()

  sendToken(user, 200, res)
})

//update User password:

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await await User.findById(req.user.id).select('+password')

  const isPassMatched = await user.comparePassword(req.body.oldPassword)

  if (!isPassMatched) {
    return next(new ErrorHander('Mật khẩu cũ không chính xác', 400))
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander('Mật khẩu không giống nhau', 400))
  }

  user.password = req.body.newPassword

  await user.save()

  sendToken(user, 200, res)
})

//update User profile

exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserProfile = {
    name: req.body.name,
    email: req.body.email,
  }

  if (req.body.avatar !== '') {
    const user = await User.findById(req.user.id)

    const imageId = user.avatar.public_id

    await cloudinary.v2.uploader.destroy(imageId)

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 150,
      crop: 'scale',
    })

    newUserProfile.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    }
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserProfile, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
  })
})
