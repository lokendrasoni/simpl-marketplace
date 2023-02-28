const Session = require("../models/sessions");
const { throwError } = require("../utilities/responses");

exports.create = async (user_id, ip, user_agent) => {
    const sessions = await Session.find({ user_id, expired: false });

    if (sessions.length >= parseInt(process.env.MAX_SESSIONS || "2")) {
        const id = sessions[0]._id.toString();
        await Session.updateOne({ _id: id }, { expired: true });
    }

    const session = await (new Session({
        user_id, ip, user_agent
    })).save();

    return session;
};

exports.verifySession = async (id, ip, user_agent) => {
    const session = await Session.findById(id);
    
    if (session) {
        if (session.ip === ip || session.user_agent === user_agent) {
            if (session.expired) {
                throw throwError("Session expired", "FORBIDDEN", 403);
            }
            else {
                return session;
            }
        }
        else {
            session.expired = true;
            throw throwError("Session expired", "FORBIDDEN", 403);
        }
    }
    else {
        throw throwError("Invalid Session", "FORBIDDEN", 403);
    }
};