const { default: mongoose } = require("mongoose");

const stockHistorySchema = mongoose.Schema({
    stockId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock'
    },
    voucherNo: {
        type: String,
        required: [true, 'Voucher No is missing']
    },
    actionStatus: {
        type: String,
        required: [true, 'Action Status is missing']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity missing']
    },
    expiryDate: {
        type: Date,
    },
    remarks: {
        type: String,
    }
},
    {
        timestamps: true
    }
)

const StockHistory = mongoose.model('StockHistory', stockHistorySchema);
module.exports = StockHistory;