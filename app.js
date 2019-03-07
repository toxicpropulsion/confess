const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const indexRouter = require("./routes/index");
const { requestLogger, consoleLogger } = require("./modules/logger");

require("dotenv").load();

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost/forgiveme",
  { useMongoClient: true }
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(requestLogger);
app.use(consoleLogger);

app.use(
  session({
    secret: process.env.sessionKey,
    resave: false,
    saveUninitialized: true
  })
);

// routes
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.env === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  next(err);
});

process.once("SIGUSR2", function() {
  shutdown();
});

process.on("SIGINT", function() {
  shutdown();
});

process.on("SIGTERM", function() {
  shutdown();
});

process.on("exit", function() {
  shutdown();
});

function shutdown(callback) {
  // TODO:
  // close server
  // move this to ./bin/www
  mongoose.connection.close(false, () => {
    console.log("Close DB connection.");
  });
  process.exit(0);
}

exports = module.exports = app;
