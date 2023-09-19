const profileModel = require('../models/Profile');

exports.createNewProfile = async (userProfile) => {
    return await profileModel.create(userProfile);
}