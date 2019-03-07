const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const rfs = require("rotating-file-stream");

const DIR = path.join(__dirname, "../logs");
const ACCESS_FILENAME = "access.log";
const FORMAT = {
  common: `[:date[iso]] :remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length]`,
  combined: `[:date[iso]] :remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":referrer" ":user-agent"`,
  tiny: `:method :url :status :res[content-length] - :response-time ms`
};

fs.existsSync(DIR) || fs.mkdirSync(DIR);

const accessLogStream = rfs(ACCESS_FILENAME, {
  interval: "1d",
  path: DIR
});

module.exports.requestLogger = morgan(FORMAT.combined, {
  stream: accessLogStream
});

module.exports.consoleLogger = morgan(FORMAT.tiny);
