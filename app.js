const Express = require('express');

const app = Express();
const utils = require('./utils/utils');
const connectDB = require('./config/db');
const ShortURL = require('./models/UrlDBSchema')
const QRCode = require('qrcode');

// Prepare the Frontend views 
app.set('views', './views');
app.set('view engine', 'ejs');

// Main page
app.get('/main', async function(req, res) {
  const allData = await ShortURL.find()
  res.render('main', { shortUrls: allData });
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



// Connect to the database
connectDB()

// Body Parser
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

app.use('/', require('./routes/get'));
app.use('/api', require('./routes/create'));


// Server Setup
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
