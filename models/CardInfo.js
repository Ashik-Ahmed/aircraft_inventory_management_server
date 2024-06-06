const { default: mongoose } = require("mongoose");

const cardInfoSchema = mongoose.Schema({
    cardNo: {
        type: String,
        required: [true, 'Card No is required.'],
    },
    aircraft: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'No selected Aircraft'],
        ref: 'Aircraft'
    },
    nomenclature: {
        type: String,
        required: [true, 'Nomenclature is required.']
    },
    stockNo: [
        {
            type: Array,
            required: [true, 'Part No. is required.']
        }
    ]
})

const CardInfo = mongoose.model('CardInfo', cardInfoSchema);
module.exports = CardInfo;