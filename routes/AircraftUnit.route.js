const express = require("express");
const { createAircraftUnit, getAircraftUnitById, getAllAircraftUnit } = require("../controllers/AircraftUnit.controller");

const router = express.Router()

router.route('/')
    .post(createAircraftUnit)
    .get(getAllAircraftUnit)


router.route('/:id')
    .get(getAircraftUnitById)


module.exports = router