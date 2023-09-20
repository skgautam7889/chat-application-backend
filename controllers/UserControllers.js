const jwt = require("jsonwebtoken");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const userServices = require("../services/UserService");
const profileService = require("../services/ProfileService");
const password = require("../helpers/Password");

exports.newUser = async (req, res) => {
  try {
    // Form validation `
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Check if User Exists or Not
    const checkUserExists = await userServices.findUserByEmail(req.body.email);
    if (checkUserExists) {
      return res.status(400).json({ success: false, message: "Email is already registered!" });
    }

    // Set accountType and hash the password
    req.body.accountType = "User";
    req.body.password = await password.hashedPassword(req.body.password);

    // Create a new user
    const user = await userServices.createNewUser(req.body);

    // Create a profile for the user
    user.profile = await profileService.createNewProfile({
      userId: user.id,
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    // Send the user and profile data as a response
    res.json({ data: user, status: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.Login = async (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // Check if User Exists or Not
  const checkUserExists = await userServices.findUserByEmail(req.body.email);
  if (!checkUserExists) {
    return res.status(401).json({
      success: false,
      message: "User is not registered, Please signup first"
    })
  }

  const checkPassword = await password.comparePassword(req.body.password, checkUserExists.password);
  if (!checkPassword) {
    return res.status(400).json({
      success: false,
      message: "Incorrect Password"
    })
  }
  const token = jwt.sign(
    {
      email: checkUserExists.email, id: checkUserExists._id, accountType: checkUserExists.accountType
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
  checkUserExists.token = "Bearer "+token;
  // checkUserExists.password = undefined;

  return res.status(200).json(checkUserExists);
  return res.status(400).json({
    success: false,
    message: "Incorrect Password"
  })
  
  // const username = req.body.username;
  // const password = req.body.password;
}