const User = require("../models/User");

exports.createUserService = async (data) => {
    const result = await User.create(data);
    return result;
}

exports.getAllUserService = async () => {
    const result = await User.find();
    return result;
}

exports.deleteUserByIdService = async (id) => {
    const result = await User.findByIdAndDelete(id);
    return result;
}

exports.updateUserByIdService = async (id, data) => {
    const result = await User.findByIdAndUpdate(id, data);
    return result;
}