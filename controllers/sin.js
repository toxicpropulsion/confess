const Sin = require("../models/sin");

exports.getRandomSin = (req, res) => {
  Sin.getRandomSin((err, data) => {
    if (err) {
      res.status(500).json({
        status: 0,
        error: err
      });
    }
    const sin = data[0];

    if (!sin) {
      res.status(404).end();
      return;
    }

    res.status(200).json({
      status: 1,
      content: sin.content,
      error: null
    });
  });
};

exports.createSin = (req, res) => {
  const sin = new Sin();
  sin.content = req.body.content;
  sin.save(err => {
    if (err) {
      console.error(err);
      res.status(500).json({
        status: 0,
        error: err
      });
    }
    res.status(200).json({
      status: 1,
      error: null
    });
  });
};
