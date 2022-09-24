const mongoose = require('mongoose')

const newsModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  samary: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: [true, 'Vui lòng nhập loại sản phẩm'],
  },
  status: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('News', newsModel)
