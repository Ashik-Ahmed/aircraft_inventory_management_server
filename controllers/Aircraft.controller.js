const { createNewAircraftService, getAllAircraftService } = require("../services/Aircraft.service");

exports.createNewAircraft = async (req, res) => {
    try {
        const aircraftData = req.body;

        const result = await createNewAircraftService(aircraftData);
        console.log(result);
        if (result?._id) {
            res.status(200).json({
                status: "Success",
                data: result
            })
        }

        else {
            res.status(400).json({
                status: "Failed",
                error: "Internal Server Error"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            error: error.message
        })
    }
}

exports.getAllAircraft = async (req, res) => {
    try {
        const result = await getAllAircraftService();
        console.log(result);
        if (result) {
            res.status(200).json({
                status: "Success",
                data: result
            })
        }
        else {
            res.status(400).json({
                status: "Failed",
                error: "Internal Server Error"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            error: error.message
        })
    }
}