// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api', (req, res) => {
  res.json({ "unix": new Date(Date.now()).getTime(), "utc": new Date(Date.now()).toUTCString() })
})
app.get("/api/:date", (req, res) => {
  let rdata = { "unix": "", "utc": "" }
  if (!req.params.date) {
    console.log('No params present. defaulting to current date.')
    rdata.unix = new Date(Date.now()).getTime()
    rdata.utc = new Date(Date.now()).toUTCString()
    res.json(rdata)
  } else {
    let pd = req.params.date
    if (!isNaN(Number(pd))) {
      console.log("no punctuation just numbers", pd)
      let ppd = new Date(Number(pd))
      rdata.unix = ppd.getTime()
      rdata.utc = ppd.toUTCString()
      res.json(rdata)
    } else {
      let ppd = new Date(pd)
      if (ppd == "Invalid Date") {
        res.json({ error: "Invalid Date" })
      } else {

        rdata.utc = ppd.toUTCString()
        rdata.unix = ppd.getTime()
        res.json(rdata)
      }
    }
  }
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
