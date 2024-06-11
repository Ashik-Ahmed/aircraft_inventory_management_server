const Stock = require("../models/Stock");
const { createStockHistoryService, deleteStockHistoryByIdService, updateStockHistoryByIdService, getStockHistoryByStockIdService } = require("../services/StockHistory.service")

exports.createStockHistory = async (req, res) => {
    try {
        const stockHistory = req.body;
        // const { stockId, ...historyData } = stockHistory;
        const result = await createStockHistoryService(stockHistory);
        console.log(stockHistory);

        if (result?._id) {

            const pushToStock = await Stock.findByIdAndUpdate(stockHistory?.stockId, {
                $push: {
                    stockHistory: result?._id
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

exports.updateStockHistoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        console.log(id, data);
        const result = await updateStockHistoryByIdService(id, data);
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

exports.deleteStockHistoryById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const result = await deleteStockHistoryByIdService(id);
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



exports.getStockHistoryByStockId = async (req, res) => {
    try {
        const stockId = req.params.stockId;

        const { issueStartDateString, issueEndDateString } = req.query;

        let issueStartDate = null;
        let issueEndDate = null;

        if (issueStartDateString) {
            const parsedStartDate = new Date(issueStartDateString);
            if (!isNaN(parsedStartDate)) { // Check if the date is valid
                issueStartDate = parsedStartDate.toISOString();
            }
        }

        if (issueEndDateString) {
            const parsedEndDate = new Date(issueEndDateString);
            if (!isNaN(parsedEndDate)) { // Check if the date is valid
                issueEndDate = parsedEndDate.toISOString();
            }
        }

        const stockHistory = await getStockHistoryByStockIdService(stockId, issueStartDate, issueEndDate);

        if (stockHistory) {
            res.status(200).json({
                status: "Success",
                data: stockHistory
            })
        }
        else {
            res.status(400).json({
                status: "Failed",
                error: "No Stock History Found"
            })
        }

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            error: error.message
        })
    }
}