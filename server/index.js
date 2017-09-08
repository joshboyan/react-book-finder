var config = require('./config');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

// configure app to use bady parser to extract JSON from POST
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// Connect to database with mongoose driver
var mongoose = require('mongoose');
mongoose.connect(config.dbURI, {
  useMongoClient: true,
});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + config.dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

// Import model
var Favorite = require('./models/favorite.js');

// Make static assets available to UI
app.use(express.static(path.join(__dirname, '../react-ui/dist')));

var router = express.Router();
// Serve the UI over express server
router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../react-ui/dist/index.html'))
});

//Initialize API
router.get('/api', function(req, res){
  res.send('API initialized');
})

//Register API routes
app.use('/api', router);
// All routes that end in /favorites
router.route('/favorites')

  // Add a favortie entry to the database
  .post(function(req, res){
    // Creat an entry
    var favorite = new Favorite();
    favorite.title = req.body.title,
    favorite.authors = req.body.authors,
    favorite.rating = req.body.rating,
    favorite.publisher = req.body.publisher,
    favorite.publishedDate = req.body.publishedDate,
    description = req.body.description,
    favorite.thumbnail = req.body.thumbnail,
    favorite.price = req.body.price,
    favorite.purchase = req.body.purchase;

    // Save the entry and check for errors
    favorite.save(function(err){
      if(err) {
        res.send(err);
      } else {
        res.json({
          message: 'Favorite added',
          favorite: favorite
        });
      }
    })

    // Get all the favorites
  })



app.listen(config.port,
  console.log('Listening on port ', config.port));

