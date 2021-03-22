const express = require("express");
const router = express.Router();
const controller = require("../controllers/oauth");

router.post("/google", controller.google);

router.get("/google/callback", controller.google_callback);

module.exports = router;
