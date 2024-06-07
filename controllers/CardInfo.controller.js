const { default: mongoose } = require("mongoose");
const Aircraft = require("../models/Aircraft");
const { createCardInfoService, getAllCardService, updateCardInfoByIdService, deleteCardInfoByIdService } = require("../services/CardInfo.service");

exports.createCardInfo = async (req, res) => {
    console.log('cardinfo api hit');
    try {
        const data = req.body;
        const result = await createCardInfoService(data);
        console.log(result);

        if (result?._id) {
            const pushToAircraft = await Aircraft.findByIdAndUpdate(data.aircraft, {
                $push: {
                    cardInfo: result._id
                }
            })
            console.log(pushToAircraft);
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
        console.log("Error:", error);
        res.status(500).json({
            status: "Failed",
            error: error.message
        })
    }
}

exports.getAllCard = async (req, res) => {
    try {
        const aircraftId = req.query.aircraftId;
        console.log(aircraftId);
        const result = await getAllCardService(aircraftId);
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

exports.updateCardInfoById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await updateCardInfoByIdService(id, data);
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

exports.deleteCardInfoById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteCardInfoByIdService(id);
        console.log("result", result);
        if (result?.deletedCount === 1) {

            const pullFromAircraft = await Aircraft.updateMany(
                { cardInfo: new mongoose.Types.ObjectId(id) },
                { $pull: { cardInfo: new mongoose.Types.ObjectId(id) } }
            );
            console.log(pullFromAircraft);
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