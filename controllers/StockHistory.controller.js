const Stock = require("../models/Stock");
const { createStockHistoryService } = require("../services/StockHistory.service")

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
