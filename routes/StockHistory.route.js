const express = require("express");
const { createStockHistory, deleteStockHistoryById, updateStockHistoryById } = require("../controllers/StockHistory.controller");


const router = express.Router()

router.route('/')
    .post(createStockHistory)

router.route('/:id')
    .patch(updateStockHistoryById)
    .delete(deleteStockHistoryById)



module.exports = router