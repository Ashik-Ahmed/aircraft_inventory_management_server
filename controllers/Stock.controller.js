const Aircraft = require("../models/Aircraft");
const { createNewStockService, getAllStockService } = require("../services/Stock.service");

exports.createNewStock = async (req, res) => {
    try {
        const data = req.body;
        const result = await createNewStockService(data);
        if (result?._id) {

            const pushToAircraft = await Aircraft.findByIdAndUpdate(data.aircraftId, {
                $push: {
                    stocks: result?._id
                }
            })

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

exports.getAllStock = async (req, res) => {
    try {
        const result = await getAllStockService();
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
                error: "No Stock Found"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            error: error.message
        })
    }
}