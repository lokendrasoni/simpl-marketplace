const router = require("express").Router();
const AuthController = require("../controllers/Auth");

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.put("/change-password", AuthController.changePassword);

module.exports = router;