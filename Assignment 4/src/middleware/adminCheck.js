function adminCheck(req, res, next) {
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(403).send('Only admin use.');
}

module.exports = adminCheck;
