const { createAircraftUnitService, getAllAircraftUnitService, getAircraftUnitByIdService, updateAircraftUnitByIdService, deleteAircraftUnitByIdService } = require("../services/AircraftUnit.service");

exports.createAircraftUnit = async (req, res) => {
    try {
        const data = req.body;
        const result = await createAircraftUnitService(data);
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

exports.getAllAircraftUnit = async (req, res) => {
    try {
        const result = await getAllAircraftUnitService();
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

exports.getAircraftUnitById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await getAircraftUnitByIdService(id);
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

exports.updateAircraftUnitById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await updateAircraftUnitByIdService(id, data);
        console.log(result);
        if (result?.modifiedCount === 1) {
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

exports.deleteAircraftUnitById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteAircraftUnitByIdService(id);
        console.log(result);
        if (result?.deletedCount === 1) {
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