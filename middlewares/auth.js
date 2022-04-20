const jwt = require('jsonwebtoken');
const lang = require('../language/fr');

module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        if (!token) {
            throw new Error(lang.ERRMSG_TOKEN_ABSENT);
        }
        
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const userId = decodedToken.userId;
        req.auth = { userId }; 
        if (req.body.userId && req.body.userId !== userId) {
            throw new Error(lang.ERRMSG_INVALID_USER_ID);
        } else {
            next(); // Token and UserId are valid
        }

    } catch (error) {
        res.status(401).json({ "message" : error.message || lang.ERRMSG_AUTH_ERROR_GENERAL });
    }
};