const { newUser, Login } = require("../controllers/UserControllers");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
});


router.post('/api/signup', newUser); //create new user
router.post('/api/login', Login); //Login user

module.exports = router;