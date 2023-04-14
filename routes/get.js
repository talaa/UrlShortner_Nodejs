const Express = require('express');
const router = Express.Router();
const Url = require('../models/UrlDBSchema');
const utils = require('../utils/utils');
var geoip = require('geoip-lite');
//const requestIp = require('request-ip');
//const geoip = require('geoip-lite');


router.get('/:urlId', async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    console.log(req.headers)
     // get the ip Address of the user
     const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
     var userIP = req.socket.remoteAddress
     if (ip.startsWith('::ffff:')) {
      ip = ip.replace('::ffff:', '');
    }
     console.log(ip); // ip address of the user
     console.log("The user IP is:",userIP); // ip address of the user
     console.log(geoip.lookup(ip)); // location of the user

    if (url) {
      
      url.referrers.push({"origin":utils.validateorigin(req.headers.referer)});
      url.clicks++;
      url.save();
      return res.redirect(url.origUrl);
    } else res.status(404).json('Not found');
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
});

module.exports = router;