const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  urlId: {
    type: String,
    required: true,
  },
  origUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  referrers:[
    {
      origin:{
        type:String
      },
      ref_date:{
        type: String,
        default: new Date(),
      }
    }
  ]
  ,
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model('urls', UrlSchema);