const { default: mongoose } = require("mongoose");
const Aircraft = require("../models/Aircraft");
const CardInfo = require("../models/CardInfo");

exports.createCardInfoService = async (data) => {
    const result = await CardInfo.create(data);
    console.log("result: ", result);
    return result;
}

exports.getAllCardService = async (aircraftId) => {
    const query = aircraftId && mongoose.Types.ObjectId.isValid(aircraftId)
        ? { aircraft: new mongoose.Types.ObjectId(aircraftId) }
        : {};
    const result = await CardInfo.find(query).populate("aircraft", "aircraftName");
    return result;
}

exports.updateCardInfoByIdService = async (id, data) => {
    const result = await CardInfo.findByIdAndUpdate(id, data);
    return result;
}

exports.deleteCardInfoByIdService = async (id) => {
    const result = await CardInfo.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    return result;
}