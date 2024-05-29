const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.cookies.token || req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Access Denied: No Token Provided');
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('Secret key not found');
        }
        const verified = jwt.verify(token, secret);
        req.user = verified;
        next();
    } catch (err) {
        console.error(err);
        res.status(400).send('Invalid Token');
    }
}

module.exports = authenticateToken;
