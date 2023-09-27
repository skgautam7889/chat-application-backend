const { newUser, Login, getUserById } = require("../controllers/UserControllers");
const { auth } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
});


router.post('/api/signup', newUser); //create new user
router.post('/api/login', Login); //Login user
router.post('/api/get-user-by-id', auth, getUserById); //get user by id

module.exports = router;