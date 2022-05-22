// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:year-:month-:day", function(req, res){
  let year = parseInt(req.params.year);
  let month = parseInt(req.params.month)-1;
  let day = parseInt(req.params.day);
  let date = new Date(year,month,day);
  
  res.json({unix: date.getTime(),
           utc: date.toUTCString()});
})

app.get("/api/:unix", function(req, res){
  let unix = parseInt(req.params.unix);
  let date = new Date(unix);
  
  res.json({unix: date.getTime(),
           utc: date.toUTCString()});
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
