const express = require("express");
const router = new express.Router();
const IndexController = require("../controllers/index");

router.get("/", IndexController);

module.exports = router;
