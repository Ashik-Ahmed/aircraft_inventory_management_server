const express = require("express");
const { createAircraftUnit, getAircraftUnitById, getAllAircraftUnit, updateAircraftUnitById, deleteAircraftUnitById } = require("../controllers/AircraftUnit.controller");

const router = express.Router()

router.route('/')
    .post(createAircraftUnit)
    .get(getAllAircraftUnit)


router.route('/:id')
    .get(getAircraftUnitById)
    .patch(updateAircraftUnitById)
    .delete(deleteAircraftUnitById)


module.exports = router