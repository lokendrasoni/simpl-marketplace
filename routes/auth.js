const router = require("express").Router();
const AuthController = require("../controllers/Auth");
const { isAuth } = require("../middlewares");

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/change-password", AuthController.changePassword);

module.exports = router;