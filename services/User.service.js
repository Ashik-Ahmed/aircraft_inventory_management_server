const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const bcrypt = require('bcryptjs');

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

//update user password
exports.updateUserPasswordByIdService = async (userId, newPassword) => {
    const hashedPassword = bcrypt.hashSync(newPassword);
    const result = await User.updateOne({ _id: new mongoose.Types.ObjectId(userId) }, { $set: { password: hashedPassword } })
    // console.log(result);
    return result;
}