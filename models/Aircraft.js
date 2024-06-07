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
    cardInfo: [
        {
            type: Array,
        }
    ],
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

// Virtual field to generate full URL for the image
aircraftSchema.virtual('imageUrl').get(function () {
    if (this.image) {
        return `${process.env.BASE_URL}${this.image}`;
    }
    return null;
});

aircraftSchema.set('toObject', { virtuals: true });
aircraftSchema.set('toJSON', { virtuals: true });

const Aircraft = mongoose.model('Aircraft', aircraftSchema);
module.exports = Aircraft;