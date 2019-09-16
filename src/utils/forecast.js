const request = require("request");

const findCelsius = fahrenheit => {
  var celsius;
  if (fahrenheit != "") {
    celsius = ((fahrenheit - 32) * 5) / 9;
    return parseFloat(celsius).toFixed(2);
  } else {
    return "N/A";
  }
};

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/7de64b2b3eefdd7043982ca1e88d63dc/" +
    latitude +
    "," +
    longitude;

  // request({url:url, json:true}, (error, response) =>{
  //     if (error){
  //         callback("Unable to connect to weather service",undefined)
  //     }
  //     else if (response.body.error){
  //         callback("Unable to find the place",undefined)
  //     }
  //     else
  //     {
  //         callback(undefined,response.body.daily.data[0].summary + ' It is currently '+response.body.currently.temperature+' degrees out. There is a '+response.body.currently.precipProbability+'% chance of rain'
  //     )
  // }
  // })

  //Shorthanded and destructured

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find the location", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It's currently " +
          findCelsius(body.currently.temperature) +
          "° C out. There is a " +
          body.currently.precipProbability +
          "% chance of rain"
      );
    }
  });
};

module.exports = forecast;
