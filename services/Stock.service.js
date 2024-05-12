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