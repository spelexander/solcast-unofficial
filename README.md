## Unofficial Solcast Node.js ##

This is an unofficial Node.js API client library for the Solcast API.
The Solcast API provides high time granularity Solar Radiation and PV panel generation forecasts. 
The official Solcast website: https://solcast.com.au/

### Install ###
##### Using npm #####
`npm install solcast-unofficial`

##### From source #####
clone the repo
`git clone https://github.com/spelexander/solcast-unofficial.git`

Install unirest http lib
`npm install unirest`

### Usage ###
```javascript
const Solcast = require("../modules/solcast.js")

// Init object with API Key (arg1) and Debug level (arg2) (can also set a diff url and other params)
var solcast = new Solcast("API KEY", 1);

// Location long and lat for the forecast
var lat = -35.277;
var long = 149.117;

// Gets radiation forecast
solcast.getRADForcasts(long, lat)
.then(result => {
  // Log results
    console.log(result);
})
.catch(err => {
    console.log(err);
});

// Installation capacity in watts (e.g. 5 kW system)
var capacity = 5000;

// Gets PV generation forecast
solcast.getPVEstimatedActuals(long, lat, capacity)
.then(result => {
  // Log results
    console.log(result);
})
.catch(err => {
    console.log(err);
});
```