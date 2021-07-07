const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
  email: String,
  name: String
})

let User = mongoose.model('user', userSchema)

module.exports = User
