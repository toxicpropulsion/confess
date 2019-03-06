const Sin = require("../models/sin");

module.exports.indexGetHandler = function(req, res) {
  Sin.getRandomSin((err, data) => {
    const sin = data[0];
    res.render("index", { sin: { text: sin.content } });
  });
};

module.exports.indexPostHandler = function(req, res) {
  const sin = new Sin();

  sin.content = req.body.text;

  sin.save(err => {
    if (err) throw err;
  });

  res.json({ handler: "indexPostHandler" });
};
