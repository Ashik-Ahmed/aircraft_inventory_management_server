const express = require("express");
const { createNewStock, getAllStock, deleteStockById } = require("../controllers/Stock.controller");


const router = express.Router();

router.route('/')
    .post(createNewStock)
    .get(getAllStock)

router.route('/:id')
    .delete(deleteStockById)


module.exports = router