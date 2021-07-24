const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// define paths for express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve.
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Asutosh" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Asutosh" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Asutosh",
    message: "email us at help.com for help and support!",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "address must be provided" });
  }
  const { address } = req.query;

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.table(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    message: "Help article not found",
    title: "404",
    name: "Asutosh",
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    message: "Page not found",
    title: "404",
    name: "Asutosh",
  });
});

// app.com
// app.com/help
// app.com/about

app.listen(3000, (req, res) => {
  console.log("server started on 3000");
});
