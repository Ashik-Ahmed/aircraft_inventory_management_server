const Stock = require("../models/Stock");
const StockHistory = require("../models/StockHistory");

exports.createStockHistoryService = async (data) => {
    const result = await StockHistory.create(data);
    console.log("creating stock history", result);
    return result;
}

exports.updateStockHistoryByIdService = async (id, data) => {
    const result = await StockHistory.findByIdAndUpdate(id, data);
    return result;
}

exports.deleteStockHistoryByIdService = async (id) => {
    const result = await StockHistory.findByIdAndDelete(id);
    return result;
}