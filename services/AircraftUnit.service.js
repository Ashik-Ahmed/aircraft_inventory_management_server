const { default: mongoose } = require("mongoose");
const AirCraftUnit = require("../models/AircraftUnit");

exports.createAircraftUnitService = async (data) => {
    const result = await AirCraftUnit.create(data);
    return result;
}

exports.getAllAircraftUnitService = async () => {
    let aircraftUnits = await AirCraftUnit.find().populate("aircraft", "aircraftName").lean();

    aircraftUnits = aircraftUnits.map(unit => {
        if (unit.aircraft) {
            unit.aircraftName = unit.aircraft.aircraftName;
            delete unit.aircraft; // Remove the aircraft object if you don't need it
        }
        return unit;
    });

    return aircraftUnits;
}

exports.getAircraftUnitByIdService = async (id) => {
    const result = await AirCraftUnit.findById(id);
    return result;
}

exports.updateAircraftUnitByIdService = async (id, data) => {
    const result = await AirCraftUnit.updateOne({ _id: new mongoose.Types.ObjectId(id) }, data);
    return result;
}


exports.deleteAircraftUnitByIdService = async (id) => {
    const result = await AirCraftUnit.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    return result;
}