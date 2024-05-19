const express = require("express");
const { createUser, getAllUser, login, getLoggedInUser, deleteUserById, updateUserById } = require("../controllers/User.controller");
const verifyToken = require("../middlewares/verifyToken");


const router = express.Router();

router.route('/login')
    .post(login)

router.get('/getLoggedInUser', verifyToken, getLoggedInUser)

router.route('/')
    .post(createUser)
    .get(getAllUser)

router.route('/:id')
    .patch(updateUserById)
    .delete(deleteUserById)


module.exports = router