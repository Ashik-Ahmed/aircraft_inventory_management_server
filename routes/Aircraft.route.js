const express = require("express");
const { createNewAircraft, getAllAircraft, getAircraftById, updateAircraftById, getStockByAircraftId } = require("../controllers/Aircraft.controller");
const verifyToken = require("../middlewares/verifyToken");
const authorization = require("../middlewares/authorization");

const router = express.Router();

router.route('/stocks/:id')
    .get(getStockByAircraftId)

router.route('/')
    .get(getAllAircraft)
    .post(verifyToken, authorization('Admin'), createNewAircraft);

router.route('/:id')
    .get(getAircraftById)
    .patch(updateAircraftById)


module.exports = router;