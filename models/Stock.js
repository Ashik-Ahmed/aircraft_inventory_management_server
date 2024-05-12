const { default: mongoose } = require("mongoose");

const stockSchema = mongoose.Schema({
    aircraftId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'No selected Aircraft'],
        ref: 'Aircraft'
    },
    cardNo: {
        type: String,
        required: [true, 'Card No is required.'],
    },
    stockNo: {
        type: String,
        required: [true, 'Stock No is required.'],
        unique: true
    },
    unit: {
        type: String,
        required: [true, 'Unit is required.'],
    },
    nomenclature: {
        type: String,
        required: [true, 'Nomenclature is required.'],
        unique: true
    },
    image: {
        type: String,
    },
    location: {
        type: String,
    },
    stockHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StockHistory'
        }
    ]
})

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;