const express = require("express");
const { createNewStock, getAllStock, deleteStockById, getStockById, getStockHistoryByStockId } = require("../controllers/Stock.controller");


const router = express.Router();

router.route('/stockHistory/:stockId')
    .get(getStockHistoryByStockId)

router.route('/')
    .post(createNewStock)
    .get(getAllStock)

router.route('/:id')
    .delete(deleteStockById)
    .get(getStockById)


module.exports = router