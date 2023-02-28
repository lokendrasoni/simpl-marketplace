const router = require("express").Router();
const buyerController = require("../controllers/buyer");
const { isAuth, isBuyer } = require("../middlewares");

router.use(isAuth, isBuyer);

router.get("/list-of-sellers",  buyerController.sellers);
router.get("/seller-catalog/:seller_id",  buyerController.catalog);
router.post("/create-order/:seller_id",  buyerController.order);

module.exports = router;