const express = require("express");
const { createNewStock, deleteStockById, getStockById, getStockHistoryByStockId, updateStockById, getAllStockReport } = require("../controllers/Stock.controller");


const router = express.Router();


router.route('/')
    .post(createNewStock)
    .get(getAllStockReport)

router.route('/:id')
    .get(getStockById)
    .patch(updateStockById)
    .delete(deleteStockById)


module.exports = router