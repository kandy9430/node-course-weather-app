const request = require("request");

module.exports = (address, callback) => {
  const mapboxToken =
    "pk.eyJ1IjoiYW5kcmV3OTQzMCIsImEiOiJja3Qwa21ta2owNjdyMzJwcW0zNjdoOGl5In0.trJfeYdow80BpPF6KkSAzQ";

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${mapboxToken}&limit=1`;

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback(
        "Unable to connect to geocode service. Please check your internet connection.",
        undefined
      );
    } else if (body.features.length === 0) {
      callback(body.message, undefined);
    } else {
      const { place_name, center } = body.features[0];
      callback(undefined, {
        latitude: center[1],
        longitude: center[0],
        location: place_name,
      });
    }
  });
};
