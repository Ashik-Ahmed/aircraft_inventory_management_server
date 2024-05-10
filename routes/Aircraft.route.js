const express = require("express");
const { createNewAircraft } = require("../controllers/Aircraft.controller");

const router = express.Router();

router.route('/')
    .post(createNewAircraft);


module.exports = router;