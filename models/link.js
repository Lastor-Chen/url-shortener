// models link.js

const mongoose = require('mongoose')

module.exports = mongoose.model('Link', 
  new mongoose.Schema({
    short: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    ssl: {
      type: Boolean,
      required: true
    }
  },{ timestamps: true })
)