const express = require("express");
const { createCardInfo, getAllCard, updateCardInfoById, deleteCardInfoById } = require("../controllers/CardInfo.controller");


const router = express.Router();


router.route('/:id')
    .patch(updateCardInfoById)
    .delete(deleteCardInfoById)

router.route('/')
    .post(createCardInfo)
    .get(getAllCard)


module.exports = router;