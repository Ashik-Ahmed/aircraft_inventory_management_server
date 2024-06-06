const Aircraft = require("../models/Aircraft");
const CardInfo = require("../models/CardInfo");

exports.createCardInfoService = async (data) => {
    const result = await CardInfo.create(data);
    console.log("result: ", result);
    return result;
}

exports.getAllCardService = async () => {
    const result = await CardInfo.find({}).populate("aircraft", "aircraftName");
    return result;
}