const { default: mongoose } = require("mongoose");
const Aircraft = require("../models/Aircraft");
const { getStockByAircraftIdService } = require("./Stock.service");

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
    // const result = await Aircraft.findById(id);
    // return result;
    console.log(id);
    const result = await Aircraft.aggregate([
        // Match the specific stock by its id
        { $match: { _id: new mongoose.Types.ObjectId(id) } },

        // Populate the stocks field
        {
            $lookup: {
                from: 'stocks', // the collection name for stockHistory
                localField: 'stocks', // field in the stock model
                foreignField: '_id', // field in the stockHistory collection
                as: 'stocks' // output array field
            },
        },
        // Unwind the stocks array to process each stock document
        { $unwind: '$stocks' },

        // Further $lookup to populate stockHistory for each stock
        {
            $lookup: {
                from: 'StockHistory', // Assuming this is the correct collection name for the StockHistory model
                localField: 'stocks.stockHistory', // Field in the unwound stock document
                foreignField: '_id', // Field in the StockHistory collection that matches the reference
                as: 'stocks.stockHistory' // The array to populate with the matched documents
            }
        },
    ])

    return result;
}

exports.updateAircraftByIdService = async (id, data) => {
    const result = await Aircraft.findByIdAndUpdate(id, data);
    return result;
}

exports.getStockByAircraftIdService = async (id) => {
    const result = await Aircraft.find({ _id: id }, { stocks: 1, aircraftName: 1 }).populate("stocks");
    return result;
}