const Stock = require("../models/Stock");
const { createStockHistoryService, getStockHistoryByStockIdService } = require("../services/StockHistory.service")

exports.createStockHistory = async (req, res) => {
    try {
        const stockHistory = req.body;
        const { stockId, ...historyData } = stockHistory;
        console.log(historyData);
        const result = await createStockHistoryService(historyData);

        if (result?._id) {

            const pushToStock = await Stock.findByIdAndUpdate(stockId, {
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

exports.getStockHistoryByStockId = async (req, res) => {
    try {
        const stockId = req.params.stockId;
        console.log(stockId);
        const stockHistory = await getStockHistoryByStockIdService(stockId);

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