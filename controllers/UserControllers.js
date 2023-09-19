const validateRegisterInput = require("../validation/register");
const userServices = require("../services/UserService");
const profileService = require("../services/ProfileService");

exports.newUser = async (req, res) => {
  try {
    // Form validation
    req.body.accountType = "User";
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Check check User Exit or Not
    const checkUserExit = await userServices.findUserByEmail(req.body.email);
    if (checkUserExit) {
      return res.status(400).json({ success: false, message: "Email is already registered!" })
    }
    const user = await userServices.createNewUser(req.body);
    user.profile = await profileService.createNewProfile({
      userId: user.id,
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    res.json({ data: user, status: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}