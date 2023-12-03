const util = require('node:util');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "bdvgauiogrmkwekvmd";
const verifyToken = util.promisify(jwt.verify);

const comparePassword = (enteredPassword, actualPassword) => {
    return bcrypt.compareSync(enteredPassword, actualPassword);
};

const signToken = (data) => {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // Token expires in an hour
        data
    }, SECRET);
};

const ensureAuthenticated = async (req, res, next) => {
    try {
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            const decoded = await verifyToken(req.headers.authorization.split(' ')[1], SECRET);
            req.user = decoded.data;
            next();
        } else {
            req.user = undefined;
            return res.status(401).send({
                status: 401,
                success: false,
                message: "Unauthorized",
                error: null
            });
        }
    } catch(err) {
        return res.status(500).send({
            status: 500,
            success: false,
            message: "Error decoding token",
            error: null
        });
    }
};

const ensureHasRole = (role) => {
    return (req, res, next) => {
        if(req.user && req.user.role === role) {
            next();
        } else {
            return res.status(403).send({
                status: 403,
                success: false,
                message: "Forbidden route",
                error: null
            });
        }
    }
};

module.exports = {
    comparePassword,
    signToken,
    ensureAuthenticated,
    ensureHasRole
};
