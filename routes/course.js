const express = require("express");
const router = express.Router();
const controller = require("../controllers/course");

router.get("/", controller.info);

router.get("/:id", controller.specificInfo);

router.post("/", controller.addCourse);

module.exports = router;
