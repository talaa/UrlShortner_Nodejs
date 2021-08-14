const Express = require('express');
const router = Express.Router();

const { lookup } = require('geoip-lite');
const { nanoid } = require('nanoid')
const { customAlphabet } =require('nanoid');
const Url = require('../models/UrlDBSchema');
const utils = require('../utils/utils');
require('dotenv').config({ path: '../config/.env' });

// Short URL Generator
router.post('/short', async (req, res) => {
    const { origUrl } = req.body;
    const base = process.env.BASE;

   
  
    //need to check urlId is unique .
    const nanoid = customAlphabet('1234567890abcdefvxyz', 7)
    const urlId = nanoid();

    
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