const { default: mongoose } = require("mongoose");
const Stock = require("../models/Stock");
const StockHistory = require("../models/StockHistory");

exports.createNewStockService = async (data) => {
    console.log(data);
    const result = await Stock.create(data);
    return result;
}

exports.getAllStockSReportervice = async (aircraftId, expiryFilter) => {
    // console.log(expiryFilter);
    let matchExpiryCondition = {}; // Default to no additional match condition for 'All'
    let matchStockStatusCondition = {};

    // Check if expiryFilter is defined and add conditions accordingly
    if (expiryFilter) {
        console.log(expiryFilter?.expiryStartDate, expiryFilter?.expiryEndDate);
        let expiryConditions = [];
        if (expiryFilter?.expiryStartDate) {
            console.log("expiry start: ", expiryFilter?.expiryStartDate);
            expiryConditions.push({ 'stockHistory.expiryDate': { $gte: new Date(expiryFilter?.expiryStartDate) } });
        }
        if (expiryFilter?.expiryEndDate) {
            console.log("expiry end: ", expiryFilter?.expiryEndDate);
            expiryConditions.push({ 'stockHistory.expiryDate': { $lte: new Date(expiryFilter?.expiryEndDate) } });
        }
        if (expiryConditions.length > 0) {
            matchExpiryCondition = { $and: expiryConditions };
        }
    }

    if (expiryFilter?.stockStatus == 'nill') {
        matchStockStatusCondition = { $expr: { $lte: ['$quantity', 0] } }
    }

    if (expiryFilter?.stockStatus == 'low') {
        matchStockStatusCondition = { $expr: { $lt: ['$quantity', '$minimumQuantity'] } };
    }
    if (expiryFilter?.stockStatus == 'sufficient') {
        matchStockStatusCondition = { $expr: { $gte: ['$quantity', '$minimumQuantity'] } };
    }

    if (expiryFilter?.stockStatus == 'all') {
        matchStockStatusCondition = {};
    }

    const result = await Stock.aggregate([
        {
            $match: aircraftId && mongoose.Types.ObjectId.isValid(aircraftId)
                ? { aircraftId: new mongoose.Types.ObjectId(aircraftId) }
                : {}
        },
        {
            $project: {
                nomenclature: 1,
                cardNo: 1,
                unit: 1,
                stockNo: 1,
                minimumQuantity: 1,
                stockHistory: 1,
            }
        },
        {
            $lookup: {
                from: 'stockhistories', // the collection name of stockHistory
                localField: 'stockHistory',
                foreignField: '_id',
                as: 'stockHistory'
            }
        },
        {
            $unwind: {
                path: '$stockHistory',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                'stockHistory.actionStatus': 1,
                'stockHistory.quantity': 1,
                'stockHistory.createdAt': 1,
                'stockHistory.expiryDate': 1,
                'stockHistory.issueDate': 1,
                nomenclature: 1,
                cardNo: 1,
                unit: 1,
                minimumQuantity: 1,
                stockNo: 1
            }
        },
        {
            $group: {
                _id: '$_id',
                stockHistory: { $push: '$stockHistory' },
                nomenclature: { $first: '$nomenclature' },
                cardNo: { $first: '$cardNo' },
                unit: { $first: '$unit' },
                stockNo: { $first: '$stockNo' },
                minimumQuantity: { $first: '$minimumQuantity' },
                latestExpiry: {
                    $min: '$stockHistory.expiryDate'
                },
                receivedQuantity: {
                    $sum: {
                        $cond: [
                            { $eq: ['$stockHistory.actionStatus', 'Received'] },
                            '$stockHistory.quantity',
                            0
                        ]
                    }
                },
                expendedQuantity: {
                    $sum: {
                        $cond: [
                            { $eq: ['$stockHistory.actionStatus', 'Expenditure'] },
                            '$stockHistory.quantity',
                            0
                        ]
                    }
                }
            }
        },
        {
            $project: {
                stockHistory: 1,
                nomenclature: 1,
                cardNo: 1,
                unit: 1,
                stockNo: 1,
                latestExpiry: 1,
                minimumQuantity: 1,
                quantity: { $subtract: ['$receivedQuantity', '$expendedQuantity'] }
            }
        },
        {
            $match: matchExpiryCondition
        },
        {
            $match: matchStockStatusCondition
        },
        {
            $sort: {
                cardNo: 1
            }
        }

    ]);
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

exports.getStockByIdService = async (id, issueStartDate, issueEndDate) => {


    // console.log(id, issueStartDate, issueEndDate);
    // let matchCondition = {};

    // // Add conditions to the matchCondition only if startDate and endDate are provided
    // if (issueStartDate && issueEndDate) {
    //     matchCondition.issueDate = { $gte: issueStartDate, $lte: issueEndDate };
    // } else if (issueStartDate) {
    //     // Only a start date is provided
    //     matchCondition.issueDate = { $gte: issueStartDate };
    // } else if (issueEndDate) {
    //     // Only an end date is provided
    //     matchCondition.issueDate = { $lte: issueEndDate };
    // }
    // console.log("matchCondition:--", matchCondition);
    const result = await Stock.findById(id)
        .populate("aircraftId", "aircraftName")
        .populate({
            path: "stockHistory",
            // select: "quantity"
            // match: matchCondition,
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


    // console.log("result:--", result);
    return result;

    // const result = await Stock.aggregate([
    //     { $match: { _id: new mongoose.Types.ObjectId(id) } },
    //     {
    //         $lookup: {
    //             from: "aircrafts",
    //             localField: "aircraftId",
    //             foreignField: "_id",
    //             as: "aircraftId"
    //         }
    //     },
    //     { $unwind: "$aircraftId" },
    //     {
    //         $lookup: {
    //             from: "stockhistories",
    //             localField: "stockHistory",
    //             foreignField: "_id",
    //             as: "stockHistory"
    //         }
    //     },
    //     {
    //         $addFields: {
    //             availableQuantity: {
    //                 $subtract: [
    //                     {
    //                         $sum: {
    //                             $map: {
    //                                 input: {
    //                                     $filter: {
    //                                         input: "$stockHistory",
    //                                         as: "history",
    //                                         cond: { $eq: ["$$history.actionStatus", "Received"] }
    //                                     }
    //                                 },
    //                                 as: "received",
    //                                 in: "$$received.quantity"
    //                             }
    //                         }
    //                     },
    //                     {
    //                         $sum: {
    //                             $map: {
    //                                 input: {
    //                                     $filter: {
    //                                         input: "$stockHistory",
    //                                         as: "history",
    //                                         cond: { $eq: ["$$history.actionStatus", "Expenditure"] }
    //                                     }
    //                                 },
    //                                 as: "expenditure",
    //                                 in: "$$expenditure.quantity"
    //                             }
    //                         }
    //                     }
    //                 ]
    //             }
    //         }
    //     },
    //     {
    //         $project: {
    //             "aircraftId.aircraftName": 1,
    //             cardNo: 1,
    //             stockNo: 1,
    //             unit: 1,
    //             nomenclature: 1,
    //             issuedAt: 1,
    //             image: 1,
    //             location: 1,
    //             stockHistory: 1,
    //             availableQuantity: 1
    //         }
    //     }
    // ]);

    // return result[0];
}


exports.updateStockByIdService = async (id, data) => {
    const result = await Stock.findByIdAndUpdate(id, data);
    return result;
}