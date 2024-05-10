const stockHistorySchema = mongoose.Schema({
    stockId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock'
    },
    action: String,
    quantity: Number,
    date: Date,
    expiry: Date,
    remarks: String
})

const StockHistory = mongoose.model('StockHistory', stockHistorySchema);
module.exports = StockHistory;