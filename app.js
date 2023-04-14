const Express = require('express');

const app = Express();
const connectDB = require('./config/db');
const ShortURL = require('./models/UrlDBSchema')

// Prepare the Frontend views 
app.set('views', './views');
app.set('view engine', 'ejs');

// Main page
app.get('/main', async function(req, res) {
  const allData = await ShortURL.find()
  res.render('main', { shortUrls: allData });
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
