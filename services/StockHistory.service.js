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


exports.getStockHistoryByStockIdService = async (id, issueStartDate, issueEndDate) => {

    // console.log(id, issueStartDate, issueEndDate);
    let matchCondition = {};

    // Add conditions to the matchCondition only if startDate and endDate are provided
    if (issueStartDate && issueEndDate) {
        matchCondition.issueDate = { $gte: issueStartDate, $lte: issueEndDate };
    } else if (issueStartDate) {
        // Only a start date is provided
        matchCondition.issueDate = { $gte: issueStartDate };
    } else if (issueEndDate) {
        // Only an end date is provided
        matchCondition.issueDate = { $lte: issueEndDate };
    }
    // console.log("matchCondition:--", matchCondition);
    const result = await Stock.findOne({ _id: id }, { stockHistory: 1, _id: 0 }).populate({
        path: "stockHistory",
        match: matchCondition,
        populate: {
            path: "aircraftUnit",
            model: "AirCraftUnit",
            populate: {
                path: "aircraft",
                model: "Aircraft",
                select: "aircraftName" // Only select the aircraftName field
            }
        }
    });
    return result;
}