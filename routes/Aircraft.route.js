const express = require("express");
const { createNewAircraft, getAllAircraft, getAircraftById, updateAircraftById } = require("../controllers/Aircraft.controller");

const router = express.Router();

router.route('/')
    .get(getAllAircraft)
    .post(createNewAircraft);

router.route('/:id')
    .get(getAircraftById)
    .patch(updateAircraftById)


module.exports = router;