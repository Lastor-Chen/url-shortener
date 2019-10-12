// models index.js

const mongoose = require('mongoose')
const DATABASE = 'shortLink'
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost/${DATABASE}`

module.exports = () => {
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('[mongoDB] connection was successfully.'))
    .catch(err => console.log('\033[31m[mongoDB] connection error.\033[0m\n', err))
}