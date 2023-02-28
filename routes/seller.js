const router = require("express").Router();
const sellerController = require("../controllers/seller");
const { isAuth, isSeller } = require("../middlewares");

router.use(isAuth, isSeller);

router.post("/create-catalog",  sellerController.catalog);
router.get("/orders",  sellerController.orders);

module.exports = router;