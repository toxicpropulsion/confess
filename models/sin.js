const mongoose = require("mongoose");

const sinSchema = new mongoose.Schema({
  content: String,
  date: { type: Date, default: Date.now }
});

sinSchema.statics.getRandomSin = function(callback) {
  this.aggregate([{ $sample: { size: 1 } }], callback);
};

module.exports = mongoose.model("Sin", sinSchema);
