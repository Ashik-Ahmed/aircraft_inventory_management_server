const express = require("express");
const { createUser, getAllUser, login, getLoggedInUser, deleteUserById, updateUserById, updateEmployeePasswordById } = require("../controllers/User.controller");
const verifyToken = require("../middlewares/verifyToken");


const router = express.Router();

router.route('/login')
    .post(login)

router.get('/getLoggedInUser', verifyToken, getLoggedInUser)

router.route(`/updatePassword/:id`)
    .patch(updateEmployeePasswordById)

router.route('/')
    .post(createUser)
    .get(getAllUser)

router.route('/:id')
    .patch(updateUserById)
    .delete(deleteUserById)


module.exports = router