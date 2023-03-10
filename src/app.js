const path = require("path");
const express = require("express");
const hbs = require("hbs");
const trendModule = require("./utils/trends");
const trends = trendModule.method;
const countries = trendModule.otherMethod;
const sendmail = require("./utils/sendMail");
const app = express();
const port = process.env.PORT || 80;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup Handlebar enige and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Home",
    owner: "Kyle Weidenmann",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact Me",
    owner: "Kyle Weidenmann",
  });
});

app.get("/search", (req, res) => {
  res.render("search", {
    title: "Trends",
    owner: "Kyle Weidenmann",
    geo: req.query.area,
  });
});

app.get("/countries", (req, res) => {
  countries((err, countriesArr) => {
    if (err) {
      return res.send({
        error: "oopx",
      });
    }
    res.send(countriesArr);
  });
});

app.get("/trends", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "Please provide a location",
    });
  }

  trends(req.query.location, (error, trendsArr) => {
    if (error) {
      return res.send({ error: error });
    }
    res.send(trendsArr);
  });
});
app.get("/sendmail", (req, res) => {
  if (!req.query.recipient || !req.query.body) {
    return res.send({
      error: "Oops something went wrong please try again.",
    });
  }
  function replaceSpaces(str) {
    return str.replace(/%20/g, " ");
  }

  sendmail
    .sendMail(
      req.query.recipient,
      replaceSpaces(req.query.body),
      replaceSpaces(req.query.subject),
      (error, success) => {
        if (error) {
          return res.send({ error: error });
        }
        res.send(success);
      }
    )
    .catch();
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    owner: "Kyle Weidenmann",
  });
});

app.listen(port, () => {
  console.log("server up on: " + port);
});
