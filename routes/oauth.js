const express = require("express");
const router = express.Router();
const controller = require("../controllers/oauth");

router.post("/kakao", controller.kakao);
router.get("/kakao/callback", controller.kakao_callback);

module.exports = router;
