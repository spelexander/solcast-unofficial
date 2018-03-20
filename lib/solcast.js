/*!
 * solcast-unofficial
 * https://github.com/spelexander/solcast-unofficial
 *
 * Copyright 2018 Alexander Spence
 * Released under the MIT license
 */
const HttpUtil = require("./httputil.js")

class Solcast extends HttpUtil {
  /**
  * @param 1 authToken - for http call authentication.
  * @param 4 baseUrl - baseUrl for commands, is optional.
  **/
  constructor(authToken, debug=0, baseUrl="https://api.solcast.com.au/") {
    super(authToken, baseUrl, debug);
  }

  prepareQuery(command, headers={}, format='json') {
    command = command.concat("?" + "api_key=" + this._authToken);
    for (var head in headers) {
      command = command.concat("&" + head + "=" + headers[head]);
    }

    return command.concat("&format=" + format);
  }

  //PV CALLS
  /**
  **/
  getCollections() {
    var command = "/pv_power/collections";
    return doQuery("GET", this.prepareQuery(command));
  }

  /**
  **/
  getAggregations(collectionId) {
    var command = this.prepareQuery("/pv_power/collections/{CollectionId}/aggregations")
    .replace("{CollectionId}", collectionId)
    return this.doQuery("GET", command);
  }

  /**
  **/
  getPVEstimatedActualsForAgg(collectionId, aggId) {
    var command = this.prepareQuery("/pv_power/collections/{CollectionId}/aggregations/{AggregationId}/estimated_actuals")
    .replace("{CollectionId}", collectionId)
    .replace("{AggregationId}", aggId);
    return this.doQuery("GET", command);
  }

  /**
  **/
  getPVForcastsForAgg(collectionId, aggId) {
    var command = this.prepareQuery("/pv_power/collections/{CollectionId}/aggregations/{AggregationId}/forecasts")
    .replace("{CollectionId}", collectionId)
    .replace("{AggregationId}", aggId);
    return this.doQuery("GET", command);
  }

  /**
  **/
  getPVEstimatedActualsForCollection(collectionId) {
    var command = this.prepareQuery("/pv_power/collections/{CollectionId}/estimated_actuals")
    .replace("{CollectionId}", collectionId);
    return this.doQuery("GET", command, {});
  }

  /**
  **/
  getPVForcastsForCollection(collectionId) {
    var command = this.prepareQuery("/pv_power/collections/{CollectionId}/forecasts")
    .replace("{CollectionId}", collectionId);
    return this.doQuery("GET", command);
  }

  buildExtraHeaders(latitude, longitude, capacity, tilt, azimuth, install_date, loss_factor) {
    var addIfNotEmpty = (name, val, headers) => {
      if (vale != null) {
        headers[name] = val;
      }
      return headers;
    }

    var headers = {
      'longitude' : longitude,
      'latitude' : latitude,
      'capacity' : capacity
    };
    headers = addIfNotEmpty("tilt", tilt, headers)
    .addIfNotEmpty("azimuth", azimuth, headers)
    .addIfNotEmpty("install_date", install_date, headers)
    .addIfNotEmpty("loss_factor", loss_factor, headers);

    return headers;
  }

  /**
  **/
  getPVLatestEstimatedActuals(latitude, longitude, capacity, tilt, azimuth, install_date, loss_factor) {
    var headers = this.buildExtraHeaders(latitude, longitude, capacity, tilt, aximuth, install_date, loss_factor);
    var command = this.prepareQuery("/pv_power/estimated_actuals/latest", headers);
    return this.doQuery("GET", command, headers);
  }

  /**
  **/
  getPVEstimatedActuals(latitude, longitude, capacity, tilt, azimuth, install_date, loss_factor) {
    var headers = this.buildExtraHeaders(latitude, longitude, capacity, tilt, aximuth, install_date, loss_factor);
    var command = this.prepareQuery("/pv_power/estimated_actuals");
    return this.doQuery("GET", command, headers);
  }

  /**
  **/
  getPVForcasts(collectionId) {
    var command = this.prepareQuery("/pv_power/collections/{CollectionId}/aggregations")
    .replace("{CollectionId}", collectionId);
    return this.doQuery("GET", command);

  }

buildLatLongQuery(command, longitude, latitude) {
  return this.doQuery("GET", this.prepareQuery(command, {
    'longitude' : longitude,
    'latitude' : latitude,
  }));
}

  // RADIATION CALLS
  getRADEstimatedActuals(longitude, latitude) {
    var command = "/radiation/estimated_actuals";
    return this.buildLatLongQuery(command, longitude, latitude);
  }

  // RADIATION CALLS
  getRADLatestEstimatedActuals(longitude, latitude) {
    var command = "/radiation/estimated_actuals/latest";
    return this.buildLatLongQuery(command, longitude, latitude);
  }

  getRADForcasts(longitude, latitude) {
    var command = "/radiation/forecasts";
    return this.buildLatLongQuery(command, longitude, latitude);
  }
}
module.exports = Solcast
