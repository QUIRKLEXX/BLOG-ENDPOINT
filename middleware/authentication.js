const jwt = require("jsonwebtoken")

const auth = async (req, res, next)=>{
    const autHeader = req.headers.authorization;
    // bearer token
if(!autHeader || !autHeader.startsWith("Bearer ")) {
    return res
        .status(401)
        .json({ success: false, msg: 'Auth failed' });
    }
const token = autHeader.split(" ")[1];
try {
    const payload = jwt.verify(token, process.env.jwt_secret);
    req.user = {userId: payload.userId, name: payload.name}
    next()
} catch (error) {
    res
        .status(401)
        .json({ success: false, msg: 'Auth failed' });
    }
}

module.exports = auth;