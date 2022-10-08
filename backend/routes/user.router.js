const express = require('express')
const {
  registerUser,
  loginUser,
  getUserDetails,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateUserProfile,
} = require('../controller/user.controller')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logout)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/password/update').put(isAuthenticatedUser, updatePassword)
router.route('/me/update').put(isAuthenticatedUser, updateUserProfile)
router.route('/me').get(isAuthenticatedUser, getUserDetails)
module.exports = router
