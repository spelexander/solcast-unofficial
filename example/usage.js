const Solcast = require("../modules/solcast.js")

/** SOLCAST EXAMPLE: **/
// Init object with Key (arg1) and Debug (arg2) (can also set a diff url and other params)
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