const mongoose = require('mongoose')
const validator = require('validator')

const schedules = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Vui lòng nhập email của bạn'],
    unique: true,
    validate: [validator.isEmail, 'Vui lòng nhập chính xác email'],
  },
  address: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  typeService: {
    type: String,
    required: [true, 'Vui lòng nhập loại dịch vụ'],
  },
  typeProduct: {
    type: String,
    required: [true, 'Vui lòng nhập loại sản phẩm'],
  },
  bookDateAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Schedules', schedules)
