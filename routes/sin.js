const express = require("express");
const router = new express.Router();
const { getRandomSin, createSin } = require("../controllers/sin");

router.get("/random", getRandomSin);
router.post("/create", createSin);

module.exports = router;
