const userModel = require('../models/user');

exports.createNewUser = async (user) => {
    return await userModel.create(user);
}

exports.findUserByEmail = async (email) => {
    return await userModel.findOne({ email });
}