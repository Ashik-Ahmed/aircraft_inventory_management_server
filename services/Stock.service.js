const Stock = require("../models/Stock");

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