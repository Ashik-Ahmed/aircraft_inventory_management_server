const Stock = require("../models/Stock");
const StockHistory = require("../models/StockHistory");

exports.createStockHistoryService = async (data) => {
    const result = await StockHistory.create(data);
    console.log("creating stock history", result);
    return result;
}
