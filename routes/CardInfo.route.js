const express = require("express");
const { createCardInfo, getAllCard } = require("../controllers/CardInfo.controller");


const router = express.Router();

router.route('/')
    .post(createCardInfo)
    .get(getAllCard)


module.exports = router;