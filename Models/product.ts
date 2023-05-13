const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  vin: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  colour: {
    type: String,
    required: true,

  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  born: {
    type: Number,
  },
})

module.exports = mongoose.model('Product', schema)