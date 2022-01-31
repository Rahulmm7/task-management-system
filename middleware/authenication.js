const jwt = require('jsonwebtoken');
const responseFile = require('../response');
// requiring responsefile for custom response
const jwthashstring = process.env.JWTSTRING;

module.exports = function (req, res, next) {
    const token = req.header('token');
    if (!token) return responseFile.errorResponse(res, 'Auth error', 401);

    try {
        const decoded = jwt.verify(token, jwthashstring);
        req.user = decoded.user;
        next();
    } catch (e) {
        console.error(e);
        return responseFile.errorResponse(res, 'Invalid Token', 401);
    }
};
