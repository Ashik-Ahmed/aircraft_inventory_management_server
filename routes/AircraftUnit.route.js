const express = require("express");
const { createAircraftUnit, getAircraftUnitById, getAllAircraftUnit, updateAircraftUnitById, deleteAircraftUnitById } = require("../controllers/AircraftUnit.controller");
const verifyToken = require("../middlewares/verifyToken");
const authorization = require("../middlewares/authorization");

const router = express.Router()

router.route('/')
    .post(createAircraftUnit)
    .get(getAllAircraftUnit)


router.route('/:id')
    .get(getAircraftUnitById)
    .patch(updateAircraftUnitById)
    .delete(verifyToken, authorization('Admin'), deleteAircraftUnitById)


module.exports = router