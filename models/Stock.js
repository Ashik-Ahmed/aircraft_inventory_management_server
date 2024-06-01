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
        unique: true
    },
    stockNo: {
        type: String,
        required: [true, 'Stock No is required.'],
    },
    unit: {
        type: String,
        required: [true, 'Unit is required.'],
    },
    nomenclature: {
        type: String,
        required: [true, 'Nomenclature is required.'],
    },
    issuedAt: {
        type: Date,
    },
    minimumQuantity: {
        type: Number,
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

// Virtual field to generate full URL for the image
stockSchema.virtual('imageUrl').get(function () {
    if (this.image) {
        return `${process.env.BASE_URL}${this.image}`;
    }
    return null;
});

stockSchema.set('toObject', { virtuals: true });
stockSchema.set('toJSON', { virtuals: true });

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;