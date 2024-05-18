const express = require("express");
const { createUser, getAllUser, login, getLoggedInUser } = require("../controllers/User.controller");
const verifyToken = require("../middlewares/verifyToken");


const router = express.Router();

router.route('/login')
    .post(login)

router.get('/getLoggedInUser', verifyToken, getLoggedInUser)

router.route('/')
    .post(createUser)
    .get(getAllUser)


module.exports = router