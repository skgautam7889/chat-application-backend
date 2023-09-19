const profileModel = require('../models/profile');

exports.createNewProfile = async (userProfile) => {
    return await profileModel.create(userProfile);
}