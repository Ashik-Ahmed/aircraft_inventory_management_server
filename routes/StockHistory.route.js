const express = require("express");
const { createStockHistory } = require("../controllers/StockHistory.controller");


const router = express.Router()

router.route('/')
    .post(createStockHistory)

// router.route('/:stockId')
//     .get(getStockHistoryByStockId)



module.exports = router