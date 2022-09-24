const mongoose = require('mongoose')
const validator = require('validator')

const infoShowrom = new mongoose.Schema({
  contacts: {
    address: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: [true, 'Vui lòng nhập email của bạn'],
      unique: true,
      validate: [validator.isEmail, 'Vui lòng nhập chính xác email'],
    },
    description: {
      type: String,
      required: [true, 'Vui lòng nhập mô tả sản phẩm'],
    },
  },
  socicalNetwork: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  service: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('InfoShowRom', infoShowrom)
