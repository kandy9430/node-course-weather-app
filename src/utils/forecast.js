const request = require("request");

module.exports = (latitude, longitude, units, callback) => {
  const weatherstackKey = "f6832380d697b555beba5a8594f6b92b";

  const url = `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=${latitude},${longitude}&units=${units}`;

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback(
        "Unable to connect to weather service. Please check your internet connection.",
        undefined
      );
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      let deg = "";
      units === "f" ? (deg = "F") : units === "m" ? (deg = "C") : (deg = "K");
      const {
        temperature,
        feelslike,
        precip,
        weather_descriptions,
        weather_icons,
      } = body.current;
      callback(undefined, {
        description: weather_descriptions[0],
        iconUrl: weather_icons[0],
        temperature,
        feelslike,
        precip,
        deg,
      });
    }
  });
};
