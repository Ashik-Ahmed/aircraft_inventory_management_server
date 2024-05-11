const { default: mongoose } = require("mongoose");

const aircraftSchema = mongoose.Schema({
    aircraftName: {
        type: String,
        required: [true, 'Aircraft name is required.'],
        unique: true,

    },
    aircraftId: {
        type: String,
        required: [true, 'Aircraft Id is required.'],
        unique: true
    },
    image: {
        type: String,
        required: [true, 'Image is required.'],
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