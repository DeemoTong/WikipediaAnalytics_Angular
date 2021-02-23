let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  dataBaseConfig = require('./database/db'),
  fs = require('fs'),
  passport = require('passport'),
  flash = require('connect-flash'),
  session = require('express-session');

var admin = fs.readFileSync('../src/dataset/administrators.txt').toString().split("\n");
var bot = fs.readFileSync('../src/dataset/bots.txt').toString().split("\n");
var adminAndBot = admin.concat(bot);

// Passport Config
require('./config/passport')(passport);

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
  useNewUrlParser: true,
  useFindAndModify: false
}).then(() => {
    console.log('Database connected sucessfully ')
  },
  error => {
    console.log('Could not connected to database : ' + error)
  }
)

// Set up express js port
const revisionRoute = require('./routes/revision.route')

const app = express();

// Express body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Setting up static directory
app.use(express.static(path.join(__dirname, 'dist/wikipedia-analytics')));


// RESTful API root
app.use('/api', revisionRoute)

// PORT
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Index Route
app.get('/', (req, res) => {
  res.send('invaild endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/wikipedia-analytics/index.html'));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});