const catchAsync = require("../utilities/catch-async");
const Session = require("../services/Session");
const User = require("../services/User");

module.exports = catchAsync(async (req, res, next) => {
    const sessionId = req.headers["x-session-id"];
    if (sessionId) {
        const ip = (
            req.headers["x-forwarded-for"] ||
            req.socket.remoteAddress ||
            ""
        );
        const user_agent = req.headers["user-agent"];

        const session = await Session.verifySession(sessionId, ip, user_agent);
        const { user } = await User.find(session.user_id);
        
        req.auth = { ...(req.auth || {}), user: user };
        next();
    }
    else {
        throw new Error("INVALID SESSION");
    }
});