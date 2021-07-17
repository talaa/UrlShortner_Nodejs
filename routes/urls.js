const Express = require('express');
const router = Express.Router();

const { lookup } = require('geoip-lite');
const { nanoid } = require('nanoid')
const Url = require('../models/Url');
const utils = require('../utils/utils');
require('dotenv').config({ path: '../config/.env' });

// Short URL Generator
router.post('/short', async (req, res) => {
    const { origUrl } = req.body;
    const base = process.env.BASE;

    // get the ip Address of the user
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip); // ip address of the user
    console.log(lookup(ip)); // location of the user
  
    //need to check urlId is unique .
    const urlId = nanoid(7);

    
    if (utils.validateUrl(origUrl)) {
      try {
        let url = await Url.findOne({ origUrl });
        if (url) {
          res.json(url);
        } else {
          const shortUrl = `${base}/${urlId}`;
  
          url = new Url({
            origUrl,
            shortUrl,
            urlId,
            date: new Date(),
          });
  
          await url.save();
          res.json(url);
        }
      } catch (err) {
        console.log(err);
        res.status(500).json('Server Error');
      }
    } else {
      res.status(400).json('Invalid Original Url');
    }
  });
  
  module.exports = router;