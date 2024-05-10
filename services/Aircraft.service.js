const Aircraft = require("../models/Aircraft");

exports.createNewAircraftService = async (data) => {
    console.log(data);
    const result = await Aircraft.create(data);
    return result;
}