const Aircraft = require("../models/Aircraft");
const { createNewStockService, deleteStockByIdService, getStockByIdService, updateStockByIdService, getAllStockSReportervice } = require("../services/Stock.service");

exports.createNewStock = async (req, res) => {
    try {
        const data = req.body;
        const result = await createNewStockService(data);

        console.log(result);
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
        console.log("Error:", error);
        res.status(500).json({
            status: "Failed",
            error: error.message
        })
    }
}

exports.getAllStockReport = async (req, res) => {
    try {
        const aircraftId = req?.query?.aircraftId;
        const expiryFilter = JSON.parse(req?.query?.expiryFilter);
        console.log("expiry filter: ", expiryFilter);
        const result = await getAllStockSReportervice(aircraftId, expiryFilter);
        // console.log(result);
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

exports.getStockById = async (req, res) => {
    try {
        // console.log("params and query");
        // console.log(req.params.id, req.query);
        const id = req.params.id;
        // const { issueStartDateString, issueEndDateString } = req.query;

        // let issueStartDate = null;
        // let issueEndDate = null;

        // if (issueStartDateString) {
        //     const parsedStartDate = new Date(issueStartDateString);
        //     if (!isNaN(parsedStartDate)) { // Check if the date is valid
        //         issueStartDate = parsedStartDate.toISOString();
        //     }
        // }

        // if (issueEndDateString) {
        //     const parsedEndDate = new Date(issueEndDateString);
        //     if (!isNaN(parsedEndDate)) { // Check if the date is valid
        //         issueEndDate = parsedEndDate.toISOString();
        //     }
        // }

        const result = await getStockByIdService(id);
        // console.log(req.params.id, req.query);

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
        console.log("Error:", error);
        res.status(500).json({
            status: "Failed",
            error: error.message
        })
    }
}


exports.updateStockById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        // console.log(id, data);
        const result = await updateStockByIdService(id, data);
        // console.log(result);
        if (result) {
            res.status(200).json({
                status: "Success",
                data: result
            })
        }
        else {
            res.status(400).json({
                status: "Failed",
                error: "Failed to update stock"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            error: error.message
        })
    }
}

exports.deleteStockById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteStockByIdService(id);
        // console.log(result);
        if (result) {
            const removeFromAircraft = await Aircraft.findByIdAndUpdate(result?.aircraftId, {
                $pull: {
                    stocks: id
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
                error: "Failed to delete stock"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            error: error.message
        })
    }
}