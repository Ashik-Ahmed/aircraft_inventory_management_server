const Stock = require("../models/Stock");
const StockHistory = require("../models/StockHistory");

exports.createNewStockService = async (data) => {
    // console.log(data);
    const result = await Stock.create(data);
    return result;
}

exports.getAllStockService = async () => {
    const result = await Stock.aggregate([
        {
            $project: {
                stockHistory: 1,
                nomenclature: 1,
                cardNo: 1,
                unit: 1,
                stockNo: 1
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
                nomenclature: 1,
                cardNo: 1,
                unit: 1,
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
                quantity: { $subtract: ['$receivedQuantity', '$expendedQuantity'] }
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

exports.getStockByIdService = async (id) => {
    // console.log(id);
    const result = await Stock.findById(id).populate("aircraftId", "aircraftName").populate("stockHistory");
    return result;
}

exports.getStockHistoryByStockIdService = async (id) => {
    const result = await Stock.find({ _id: id }, { stockHistory: 1 });
    return result;
}

exports.updateStockByIdService = async (id, data) => {
    const result = await Stock.findByIdAndUpdate(id, data);
    return result;
}