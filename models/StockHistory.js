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
    itemType: {
        type: String,
        required: [true, 'Item Type is missing']
    },
    actionStatus: {
        type: String,
    },
    aircraftUnit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AirCraftUnit'
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity missing']
    },
    expiryDate: {
        type: Date,
        required: [true, 'Expiry Date missing']
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