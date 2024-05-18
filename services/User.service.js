const User = require("../models/User");

exports.createUserService = async (data) => {
    const result = await User.create(data);
    return result;
}

exports.getAllUserService = async () => {
    const result = await User.find();
    return result;
}