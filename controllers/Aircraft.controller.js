const { createNewAircraftService } = require("../services/Aircraft.service");

exports.createNewAircraft = async (req, res) => {
    const aircraftData = req.body;

    const result = await createNewAircraftService(aircraftData);
    console.log(result);
    res.send(result);

}