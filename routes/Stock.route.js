const express = require("express");
const { createNewStock, getAllStock } = require("../controllers/Stock.controller");


const router = express.Router();

router.route('/')
    .post(createNewStock)
    .get(getAllStock)


module.exports = router