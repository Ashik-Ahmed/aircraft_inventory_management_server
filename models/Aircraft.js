const { default: mongoose } = require("mongoose");

const aircraftSchema = mongoose.Schema({
    aircraftName: {
        type: String,
        required: true
    },
    aircraftId: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    stocks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stock'
        }
    ]
})

const Aircraft = mongoose.model('Aircraft', aircraftSchema);
module.exports = Aircraft;