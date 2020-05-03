const mongoose = require('mongoose');
const config = require('./../config/config.js').get(/*process.evn.NODE_ENV*/null);

const placeHoldersSchema = mongoose.Schema({
  pageName: {
    type: String
  },
  resumeTitle: {
    type: String,
  },
  resumeText: {
    type: String
  },
  contactTitle: {
    type: String
  },
  contactText: {
    type: String
  },
  homeTitle: {
    type: String
  },
  homeText: {
    type: String
  }
})

const PlaceHolder = mongoose.model('PlaceHolder', placeHoldersSchema);

module.exports = { PlaceHolder }
