const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

//Google passport definition 
// Configure Passport with the Google strategy.
/*
passport.use(new GoogleStrategy({
    clientID: '{YOUR_CLIENT_ID}',
    clientSecret: '{YOUR_CLIENT_SECRET}',
    callbackURL: '/auth/google/callback',
  }, (accessToken, refreshToken, profile, done) => {
    // Do something with the user's information, such as storing it in a database or redirecting them to a different page.
    console.log('User ID: ' + profile.id);
    console.log('Name: ' + profile.name);
    console.log('Email: ' + profile.email);
    done(null, profile);
  }));
*/
// Post Method for Signup User 
router.post('/signup', async (req, res) => {
    // Get the user's name, email, and password from the request body.
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
  
    // Check if the user already exists.
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).send('User already exists.');
      return;
    }
  
    // Create a new user.
    const newUser = new User({
      name,
      email,
      password,
    });
  
    // Save the user to the database.
    await newUser.save();
  
    // Redirect the user to the login page.
    res.redirect('/login');
  });
  /*
  // 
  router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
  
    // create a new user in your database
    const newUser = new User({
      name,
      email,
      password,
    });
  
    newUser.save((err) => {
      if (err) {
        console.log(err);
        res.redirect('/signup');
      } else {
        // log in the user
        req.login(newUser, (err) => {
          if (err) {
            console.log(err);
          }
          res.redirect('/login');
        });
      }
    });
  });
  */

module.exports = router;  