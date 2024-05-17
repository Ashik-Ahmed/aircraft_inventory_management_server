const Stock = require("../models/Stock");
const StockHistory = require("../models/StockHistory");

exports.createNewStockService = async (data) => {
    // console.log(data);
    const result = await Stock.create(data);
    return result;
}

exports.getAllStockService = async () => {
    const result = await Stock.find({});
    return result;
}

exports.deleteStockByIdService = async (id) => {
    const stock = await Stock.findById(id);
    // console.log(stock);
    if (stock?.stockHistory?.length > 0) {
        const deleteStockHistory = await StockHistory.deleteMany({ _id: { $in: stock.stockHistory } });
        console.log(deleteStockHistory);
        if (deleteStockHistory?.deletedCount > 0) {
            const result = await Stock.findByIdAndDelete(id);
            return result;
        }
    }
    const result = await Stock.findByIdAndDelete(id);
    return result;
}

exports.getStockByIdService = async (id) => {
    // console.log(id);
    const result = await Stock.findById(id).populate("aircraftId", "aircraftName").populate("stockHistory");
    return result;
}

exports.getStockHistoryByStockIdService = async (id) => {
    const result = await Stock.find({ _id: id }, { stockHistory: 1 });
    return result;
}