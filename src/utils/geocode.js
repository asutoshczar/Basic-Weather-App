const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYXN1dHNvaCIsImEiOiJja3JidGxpdTYwamlnMm9uaWtpNjN0bTVlIn0.xKorBXrN9o7AW3flPGh8-Q`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to geocoding services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location, try another search", undefined);
    } else {
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      const place = body.features[0].place_name;
      callback(undefined, { latitude, longitude, location: place });
    }
  });
};

module.exports = geocode;
