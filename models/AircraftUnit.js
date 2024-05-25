const { default: mongoose } = require("mongoose");

const AirCraftUnitSchema = mongoose.Schema({
    aircraft: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aircraft'
    },
    regNo: {
        type: String,
        required: [true, 'Registration No. is required.'],
        unique: true
    },
    serialNo: {
        type: String,
        required: [true, 'Serial No. is required.'],
        unique: true
    }
})

const AirCraftUnit = mongoose.model('AirCraftUnit', AirCraftUnitSchema);
module.exports = AirCraftUnit;