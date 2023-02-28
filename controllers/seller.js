const sellerService = require("../services/seller");
const catchAsync = require("../utilities/catch-async");
const { sendResponse } = require("../utilities/responses");

exports.catalog = catchAsync(async (req, res) => {
    const { id } = req.auth.user;
    const { name, products } = req.body;

    const data = await sellerService.createCatalog({ seller_id: id, name, products });

    return sendResponse(res, data);
});

exports.orders = catchAsync(async (req, res) => {
    const { id } = req.auth.user;
    const { page, limit } = req.query;

    const { data, pagination } = await sellerService.getOrders(id, page, limit);

    return sendResponse(res, data, { pagination });
});