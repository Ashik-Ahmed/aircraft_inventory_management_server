const stockSchema = mongoose.Schema({
    aircraftId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aircraft'
    },
    cardNo: String,
    stockNo: String,
    unit: String,
    nomenclature: String,
    image: String,
    location: String,
    stockHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StockHistory'
        }
    ]
})

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;