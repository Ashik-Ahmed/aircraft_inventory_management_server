const Stock = require("../models/Stock");
const StockHistory = require("../models/StockHistory");

exports.createStockHistoryService = async (data) => {
    const result = await StockHistory.create(data);
    console.log("creating stock history", result);
    return result;
}

exports.getStockHistoryByStockIdService = async (id) => {
    const result = await Stock.find({ _id: id }, { stockHistory: 1 });
    return result;
}