/*!
 * solcast-unofficial
 * https://github.com/spelexander/solcast-unofficial
 *
 * Copyright 2018 Alexander Spence
 * Released under the MIT license
 */
const unirest = require("unirest");

class HttpUtil {
  constructor(authToken, baseUrl, debug=0) {
      this._baseUrl = baseUrl;
      this._authToken = authToken;
      this._debug = debug;
  }

  set authToken(authToken) {
    this._authToken = authToken;
  }

  set baseUrl(baseUrl) {
    this._baseUrl = baseUrl;
  }

  buildQuery(command) {
    return this._baseUrl + command;
  }

  doQuery(type, command, headers={}) {
    if (this._debug > 0) {
      console.log("About to perform command: " + command);
      console.log("Headers for command:");
      for (var head in headers) {
        console.log(head + " : " + headers[head]);
      }
    }

    // Async code
    return new Promise((resolve, reject) => {
      var req = unirest(type, this.buildQuery(command))
      .headers({
          "cache-control": "no-cache",
          "authentication": "Bearer " + this._authToken,
          "authorization": "Bearer " + this._authToken,
          "api_key" : this._authToken
        }).send(headers)
        .end(function(res) {
          if (res.error) {
            reject(res.error.message);
          } else {
          resolve(res.body);
          }
        })
    })
  }
};
module.exports = HttpUtil;
