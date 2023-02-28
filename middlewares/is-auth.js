const User = require("../models/users");
const sessionService = require("../services/sessions");
const catchAsync = require("../utilities/catch-async");
const { throwError } = require("../utilities/responses");

module.exports = catchAsync(async (req, res, next) => {
    const sessionId = req.headers["x-session-id"];
    if (sessionId) {
        const ip = (
            req.headers["x-forwarded-for"] ||
            req.socket.remoteAddress ||
            ""
        );
        const user_agent = req.headers["user-agent"];

        const session = await sessionService.verifySession(sessionId, ip, user_agent);
        let user = await User.findById(session.user_id);

        if (!user) {
            throw throwError("User does not exist", "NOT_FOUND", 404);
        }
        user = user.toObject();
        user.id = user._id;
        delete user["_id"]; delete user["__v"]; delete user["password"];
        
        req.auth = { ...(req.auth || {}), user: user };
        next();
    }
    else {
        throw throwError("Invalid session", "FORBIDDEN", 403);
    }
});