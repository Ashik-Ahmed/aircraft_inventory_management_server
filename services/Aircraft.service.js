const { default: mongoose } = require("mongoose");
const Aircraft = require("../models/Aircraft");
const { getStockByAircraftIdService } = require("./Stock.service");
const CardInfo = require("../models/CardInfo");

exports.createNewAircraftService = async (data) => {
    console.log(data);
    const result = await Aircraft.create(data);
    return result;
}

exports.getAllAircraftService = async () => {
    const result = await Aircraft.find({});
    return result;
}

exports.getAricraftByIdService = async (id) => {
    const result = await Aircraft.findById(id);
    return result;
}

exports.updateAircraftByIdService = async (id, data) => {
    const result = await Aircraft.findByIdAndUpdate(id, data);
    return result;
}

exports.getStockByAircraftIdService = async (id) => {
    // const result = await Aircraft.find({ _id: id }, { stocks: 1, aircraftName: 1 }).populate("stocks");
    // return result;
    // console.log(id);
    const result = await Aircraft.aggregate([
        // Match the specific stock by its id
        { $match: { _id: new mongoose.Types.ObjectId(id) } },

        // Populate the stocks field
        {
            $lookup: {
                from: 'stocks', // The 'stocks' collection
                localField: 'stocks', // Field in Aircraft schema
                foreignField: '_id', // Field in the Stock schema
                as: 'stocks' // Alias for the populated data
            }
        },
        // Use $unwind with 'preserveNullAndEmptyArrays' option set to true
        { $unwind: { path: '$stocks', preserveNullAndEmptyArrays: true } },
        // Second lookup to populate 'stockHistory' for each stock
        {
            $lookup: {
                from: 'stockhistories', // The 'stockhistories' collection, collection names are usually plural
                localField: 'stocks.stockHistory', // Path to stockHistory from deconstructed stock
                foreignField: '_id', // Field in the StockHistory schema
                as: 'stocks.stockHistory' // Alias for the populated data
            }
        },
        // Add fields to calculate 'quantity'
        {
            $addFields: {
                'stocks.quantity': {
                    $reduce: {
                        input: '$stocks.stockHistory',
                        initialValue: 0,
                        in: {
                            $cond: {
                                if: { $eq: ['$$this.actionStatus', 'Received'] },
                                then: { $add: ['$$value', '$$this.quantity'] },
                                else: { $subtract: ['$$value', '$$this.quantity'] }
                            }
                        }
                    }
                },
                'stocks.latestExpiry': {
                    $min: '$stocks.stockHistory.expiryDate'
                }
            }
        },
        // Project to exclude the 'stockHistory' field
        {
            $project: {
                'stocks.stockHistory': 0
            }
        },

        // Group to reconstruct the 'stocks' array
        {
            $group: {
                _id: '$_id',
                aircraftName: { $first: '$aircraftName' },
                aircraftId: { $first: '$aircraftId' },
                image: { $first: '$image' },
                cardInfo: { $first: '$cardInfo' },
                // Handle the case where 'stocks' might be null after $unwind
                stocks: {
                    $push: {
                        $cond: {
                            if: '$stocks.nomenclature',
                            then: '$stocks',
                            else: '$$REMOVE'
                        }
                    }
                }
            }
        },


        {
            $lookup: {
                from: 'cardinfos',
                localField: 'cardInfo',
                foreignField: '_id',
                as: 'cardInfo'
            }
        },

        // Use $unwind with 'preserveNullAndEmptyArrays' option set to true
        { $unwind: { path: '$cardInfo', preserveNullAndEmptyArrays: true } },
        {
            $group: {
                _id: '$_id',
                aircraftName: { $first: '$aircraftName' },
                aircraftId: { $first: '$aircraftId' },
                image: { $first: '$image' },
                stocks: { $first: '$stocks' }, // Make sure stocks are grouped correctly
                cardInfo: {
                    $push: {
                        _id: '$cardInfo._id',
                        cardNo: '$cardInfo.cardNo',
                        nomenclature: '$cardInfo.nomenclature',
                        stockNo: '$cardInfo.stockNo'
                    }
                } // Use $push to reconstruct the array
            }
        },
        {
            $project: {
                _id: 1,
                aircraftName: 1,
                aircraftId: 1,
                image: 1,
                cardInfo: 1,
                stocks: 1
            }
        }
    ]);
    // console.log("stocks: ", result);
    return result;
}