const express = require("express");
const { createNewAircraft, getAllAircraft, getAircraftById, updateAircraftById, getStockByAircraftId } = require("../controllers/Aircraft.controller");

const router = express.Router();

router.route('/stocks/:id')
    .get(getStockByAircraftId)

router.route('/')
    .get(getAllAircraft)
    .post(createNewAircraft);

router.route('/:id')
    .get(getAircraftById)
    .patch(updateAircraftById)


module.exports = router;