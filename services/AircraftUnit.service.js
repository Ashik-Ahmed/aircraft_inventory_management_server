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