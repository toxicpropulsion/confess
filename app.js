const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const IndexRouter = require("./routes/index");
const SinsRouter = require("./routes/sin");
const { requestLogger, consoleLogger } = require("./lib/logger");

require("dotenv").load();

const { NODE_ENV, MONGO_DB_URI, SESSION_KEY } = process.env;

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true });

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
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: true
  })
);

// routes
app.use("/", IndexRouter);
app.use("/sins", SinsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = NODE_ENV === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  next(err);
});

async function shutdown() {
  await mongoose.connection.close();
  console.log("Close DB connection.");
  process.exit(0);
}

process.once("SIGUSR2", function() {
  console.log("Recieved SIGUSR2");
  shutdown();
});

process.on("SIGINT", function() {
  console.log("Recieved SIGINT");
  shutdown();
});

process.on("SIGTERM", function() {
  console.log("Recieved SIGTERM");
  shutdown();
});

process.on("exit", function() {
  console.log("Recieved exit");
  shutdown();
});

module.exports = app;
