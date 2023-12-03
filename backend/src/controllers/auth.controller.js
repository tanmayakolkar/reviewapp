const User = require("../../db/models").User;
const bcrypt = require("bcrypt");
const authUtil = require("../utils/auth.util");

const register = async (req, res) => {
    try {
        const user = User.build({
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            phone: req.body.phone,
            city: req.body.city,
            state: req.body.state,
        });
        user.password = bcrypt.hashSync(req.body.password, 10);
        await user.save();
        let userObj = user.toJSON();
        delete userObj.password;
        return res.status(201).send({
            status: 201,
            success: true,
            data: userObj
        });
    } catch (err) {
        return res.status(500).send({
            status: 500,
            success: false,
            message: "Error occured",
            error: err
        });
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user || !authUtil.comparePassword(req.body.password, user.password)) {
            return res.status(401).send({
                status: 401,
                success: false,
                message: 'Authentication failed. Invalid user or password.'
            });
        }

        return res.json({
            status: 200,
            success: true,
            data: {
                token: authUtil.signToken({
                    name: user.name,
                    email: user.email,
                    role: user.role
                })
            }
        });
    } catch (err) {
        return res.status(500).send({
            status: 500,
            success: false,
            message: "Error occured",
            error: err
        });
    }
};

const getProfileDetails = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.user.email
            }
        });

        if (!user) {
            return res.status(400).send({
                status: 400,
                success: false,
                message: 'User not found',
                error: null
            });
        }

        let userObj = user.toJSON();
        delete userObj.password;
        return res.json({
            status: 200,
            success: true,
            data: userObj
        });
    } catch (err) {
        return res.status(500).send({
            status: 500,
            success: false,
            message: "Error occured",
            error: err
        });
    }
};

module.exports = {
    register,
    login,
    getProfileDetails
};
