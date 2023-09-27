const userModel = require('../models/User');

exports.createNewUser = async (user) => {
    return await userModel.create(user);
}

exports.findUserByEmail = async (email) => {
    return await userModel.findOne({ email });
}
exports.findUserById = async (userId) => {
    return await userModel.findOne({ _id: userId }).populate('profile');
}