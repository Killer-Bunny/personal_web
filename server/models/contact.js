const mongoose = require('mongoose');
const config = require('./../config/config.js').get(/*process.evn.NODE_ENV*/null);

const contactSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  name: {
    type: String
  },
  phone: {
    type: String,
    required: true,
  },
  title: {
    type: String
  },
  content: {
    type: String,
    required: true,
  }
})

const Contact = mongoose.model('Contact', contactSchema);

module.exports = { Contact }
