const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=d31038cf7b301aa33ea6d4d0f7e8341f&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect weather services");
    } else if (body.error) {
      callback("Unable to find the location");
    } else {
      const current = body.current;
      callback(undefined, {
        temperature: current.temperature,
        feelslike: current.feelslike,
        weather_descriptions: current.weather_descriptions[0],
      });
    }
  });
};

module.exports = forecast;
