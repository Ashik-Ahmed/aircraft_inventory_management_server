const Aircraft = require("../models/Aircraft");
const { getStockByAircraftIdService } = require("./Stock.service");

exports.createNewAircraftService = async (data) => {
    console.log(data);
    const result = await Aircraft.create(data);
    return result;
}

exports.getAllAircraftService = async () => {
    const result = await Aircraft.find({});
    return result;
}

exports.getAricraftByIdService = async (id) => {
    const result = await Aircraft.findById(id);
    return result;
}

exports.updateAircraftByIdService = async (id, data) => {
    const result = await Aircraft.findByIdAndUpdate(id, data);
    return result;
}

exports.getStockByAircraftIdService = async (id) => {
    const result = await Aircraft.find({ _id: id }, { aircraftName: 1 }).populate("stocks");
    return result;
}