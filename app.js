const Express = require('express');
const ensureAuthenticated = require('./config/middleware');
const app = Express();
const utils = require('./utils/utils');
const connectDB = require('./config/db');
const ShortURL = require('./models/UrlDBSchema');
const User =require('./models/User');
const QRCode = require('qrcode');
const passport = require('passport');


// Prepare the Frontend views 
app.set('views', './views');
app.set('view engine', 'ejs');

// Main page
app.get('/main', async function(req, res) {
  const allData = await ShortURL.find()
  res.render('main', { shortUrls: allData });
  //res.render('b');
});
//route for the Login page 
app.get('/login',async function(req,res){
  res.render('login');
});
//route for the register page 
app.get('/Signup',async function(req,res){
  res.render('Signup');
});
//Detail page of the url 
app.get('/urls/:id', async (req, res) => {
  const urlId = req.params.id;
  const shortUrl = await ShortURL.findById(urlId).exec();
  if (!shortUrl) {
    res.status(404).send('Short URL not found');
  } else {
    const clicks = shortUrl.referrers;
    const chartData = utils.createChartdata(clicks);
    // Generate QR code
    const qrCodeDataUrl = await QRCode.toDataURL(shortUrl.shortUrl);
    res.render('details', {chartData: chartData,shortUrl: shortUrl,qrCodeDataUrl: qrCodeDataUrl});
  }
});

//Init the Passport 
app.use(passport.initialize());
app.use(passport.session());



// Connect to the database
connectDB()

// Body Parser
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

//routes definition
app.use('/', require('./routes/get'));
app.use('/api', require('./routes/create'));
app.use('/user', require('./routes/user_signup'));
app.use('/auth', require('./routes/auth'));


// Server Setup
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
