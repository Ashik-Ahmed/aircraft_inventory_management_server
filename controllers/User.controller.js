const User = require("../models/User");
const { createUserService, getAllUserService } = require("../services/User.service");
const { generateToken } = require("../utils/token");

exports.createUser = async (req, res) => {
    try {
        const data = req.body;
        const result = await createUserService(data);
        if (result) {
            res.status(200).json({
                status: "Success",
                data: result
            })
        } else {
            res.status(400).json({
                status: "Failed",
                error: "Failed to create user"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            error: error.message
        })
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const result = await getAllUserService();
        if (result) {
            res.status(200).json({
                status: "Success",
                data: result
            })
        } else {
            res.status(400).json({
                status: "Failed",
                error: "Failed to get user"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            error: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                status: 'Failed',
                error: 'Please provide email and password'
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                status: 'Failed',
                error: 'No user found'
            })
        }

        const isPasswordMatched = user.comparePassword(password, user.password);

        if (!isPasswordMatched) {
            return res.status(403).json({
                status: 'Failed',
                error: 'Password is not correct'
            })
        }

        const token = generateToken(user);
        const { password: pwd, ...others } = user.toObject();

        res.status(200).json({
            status: 'Success',
            message: 'Successfully logged in',
            data: {
                user: others,
                token
            }
        })

    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            error: error.message,
        })
    }
}

exports.getLoggedInUser = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.user?.email });
        const { password, ...others } = user.toObject();

        res.status(200).json({
            status: 'success',
            user: others
        })
    } catch (error) {
        res.status(403).json({
            status: 'failed',
            error: 'Invalid Token',
        })
    }
}
