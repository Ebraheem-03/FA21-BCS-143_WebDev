const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        req.isAuthenticated = false;
        return next();
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            req.isAuthenticated = false;
            return next();
        }
        req.user = user;
        req.isAuthenticated = true;
        next();
    });
}

module.exports = authenticateToken;
