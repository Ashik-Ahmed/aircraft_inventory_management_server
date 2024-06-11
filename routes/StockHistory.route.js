const express = require("express");
const { createStockHistory, deleteStockHistoryById, updateStockHistoryById, getStockHistoryByStockId } = require("../controllers/StockHistory.controller");


const router = express.Router()


router.route('/detailsHistory/:stockId')
    .get(getStockHistoryByStockId)

router.route('/')
    .post(createStockHistory)

router.route('/:id')
    .patch(updateStockHistoryById)
    .delete(deleteStockHistoryById)



module.exports = router