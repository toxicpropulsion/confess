const Sin = require("../models/sin");

exports.getRandomSin = (req, res, next) => {
  Sin.getRandomSin((err, data) => {
    if (err) {
      res.status(500).json({
        status: 0,
        error: err
      });
    }
    const sin = data[0];
    res.status(200).json({
      status: 1,
      content: sin.content,
      error: null
    });
  });
};

exports.createSin = (req, res, next) => {
  const sin = new Sin();
  sin.content = req.body.content;
  sin.save(err => {
    if (err) {
      console.error(error);
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
