const catchAsync = require("../utilities/catch-async");
const { throwError } = require("../utilities/responses");

module.exports = catchAsync(async (req, res, next) => {
    if (req.auth?.user && req.auth.user.type === "buyer") {
        next();
    }
    else {
        throw throwError("User is not allowed to access this endpoint", "NOT_ALLOWED", 405);
    }
});