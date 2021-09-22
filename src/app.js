const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

// set handlebars view engine and views directory location
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
// set handlebars partials directory
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

// set static directory to be served
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "Andrew" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Andrew" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This would eventually be a helpful message.",
    name: "Andrew",
  });
});

app.get("/weather", (req, res) => {
  const { address, units } = req.query;
  if (!address) {
    return res.send({
      error: "You must provide an address or location",
    });
  } else if (!units) {
    return res.send({
      error:
        "You must provide a units parameter (m = Celsius, s = Kelvin, f = Fahrenheit",
    });
  }
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, units, (error, forecast) => {
      if (error) {
        return res.send({ error });
      }
      res.send({ location, forecast });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found",
    name: "Andrew",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found",
    name: "Andrew",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
