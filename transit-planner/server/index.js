const express = require('express');
const bodyParser = require('body-parser');
const getAllLines = require('../database-mysql/index.js').getAllLines;
const getStops = require('../database-mysql/index.js').getStops;
const toggleFavStation = require('../database-mysql/index.js').toggleFavStation;
const getStations = require('../database-mysql/index.js').getStations;

const db = require('../database-mysql');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


 app.use(express.static(__dirname + '/../react-client/dist'));


// request handler that respond to `GET` requests to `/api/lines` 

app.get('/api/lines', (req, res) => {
  getAllLines((err, data) => {
  	if (err) {
  		res.sendStatus(500).send(err)
  		return;
  	}
  	console.log('server retrieve data:',  data);

  	res.json((data));
  })

});

//route handler that will respond to `GET` requests to `/api/lines/:lineId`
app.get('/api/lines/:lineid', (req,res) => {
  //console.log(req.params.lineid)
  const lineid = req.params.lineid;
  getStops(lineid, (err, data) => {
    if (err) {
      res.sendStatus(500).send(err)
      return;
    }
    res.json(data);
  })
  
})

//handler that respond to POST requests to '/api/toggleFavStation/:stationId' 
app.post('/api/toggleFavStation/:stationId', (req, res) => {
  const stationId = req.params.stationId;

 
  toggleFavStation(stationId, (err, data) => {
    if(err) {
      return res.status(500).send(err);
    }

    res.json(data);


  })


})

// handler that respond to Get request to '/api/stations/'
app.get('/api/stations/', (req, res) => {

  getStations((err, data) => {

    if (err) {
      res.sendStatus(500).send(err)
      return;
    }
    res.json(data)
  })

});
// Write additional route handlers as needed below!

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
