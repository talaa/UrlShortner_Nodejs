const Express = require('Express');
const app = Express();
const connectDB = require('./config/db');
const ShortURL = require('./models/Url')

// Prepare the Frontend views 
app.set('views', './views');
app.set('view engine', 'ejs');

// Main page
app.get('/main', async function(req, res) {
  const allData = await ShortURL.find()
  res.render('index', { shortUrls: allData });
});


// Connect to the database
connectDB()

// Body Parser
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use('/api', require('./routes/urls'));

// Server Setup
const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
