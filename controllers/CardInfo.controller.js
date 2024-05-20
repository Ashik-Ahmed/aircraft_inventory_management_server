const Aircraft = require("../models/Aircraft");
const { createCardInfoService, getAllCardService } = require("../services/CardInfo.service");

exports.createCardInfo = async (req, res) => {

    try {
        const data = req.body;
        const result = await createCardInfoService(data);

        if (result?._id) {
            const pushToAircraft = await Aircraft.findByIdAndUpdate(data.aircraft, {
                $push: {
                    cardInfo: result._id
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

exports.getAllCard = async (req, res) => {
    try {
        const result = await getAllCardService();
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