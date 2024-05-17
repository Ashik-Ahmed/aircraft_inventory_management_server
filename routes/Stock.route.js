const express = require("express");
const { createNewStock, getAllStock, deleteStockById, getStockById, getStockHistoryByStockId, updateStockById } = require("../controllers/Stock.controller");


const router = express.Router();

router.route('/stockHistory/:stockId')
    .get(getStockHistoryByStockId)

router.route('/')
    .post(createNewStock)
    .get(getAllStock)

router.route('/:id')
    .delete(deleteStockById)
    .get(getStockById)
    .patch(updateStockById)


module.exports = router