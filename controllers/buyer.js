const buyerService = require("../services/buyer");
const catchAsync = require("../utilities/catch-async");
const { sendResponse } = require("../utilities/responses");

exports.sellers = catchAsync(async (req, res) => {
    const sellers = await buyerService.getSellers();

    return sendResponse(res, sellers);
});

exports.catalog = catchAsync(async (req, res) => {
    const { seller_id } = req.params;

    const data = await buyerService.getCatalog(seller_id);

    return sendResponse(res, data);
});

exports.order = catchAsync(async (req, res) => {
    const { seller_id } = req.params;
    const { products } = req.body;

    const data = await buyerService.createOrder({ seller_id, buyer_id: req.auth.user.id, products });

    return sendResponse(res, data);
});