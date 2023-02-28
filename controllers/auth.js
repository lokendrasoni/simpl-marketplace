const authService = require("../services/auth");
const sessionService = require("../services/sessions");
const catchAsync = require("../utilities/catch-async");
const { sendResponse } = require("../utilities/responses");

exports.login = catchAsync(async (req, res) => {
    const { username, password } = req.body;
    const { user } = await authService.login(username, password);
    const ip = (
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress ||
        ""
    );
    const user_agent = req.headers['user-agent'];

    const session = await sessionService.create(user.id, ip, user_agent);
    
    return sendResponse(res, session);
});

exports.register = catchAsync(async (req, res) => {
    const { username, password, type } = req.body;
    const { user } = await authService.register(username, password, type);
    const ip = (
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress ||
        ""
    );
    const user_agent = req.headers['user-agent'];

    const session = await sessionService.create(user.id, ip, user_agent);

    return sendResponse(res, session._id);
});

exports.changePassword = catchAsync(async (req, res) => {
    await authService.updatePassword(req.body.user_id, req.body);

    res.json({
        success: true,
        message: "Password reset successfully."
    });
});