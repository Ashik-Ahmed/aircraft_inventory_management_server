const { default: mongoose } = require("mongoose");

const aircraftSchema = mongoose.Schema({
    aircraftName: String,
    aircraftId: String,
    Image: String,
    stocks: Array
})

const Aircraft = mongoose.model('Aircraft', aircraftSchema);
module.exports = Aircraft;