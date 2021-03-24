const express = require("express");
const router = express.Router();
const controller = require("../controllers/oauth");

router.post("/kakao", controller.kakao);

module.exports = router;
