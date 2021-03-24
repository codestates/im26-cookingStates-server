const express = require("express");
const router = express.Router();
const controller = require("../controllers/recipe");
const multer = require("multer");
const upload = multer();

router.get("/", controller.info);

router.get("/:id", controller.specificInfo);

router.post("/:id/checked", controller.checkedRecipe);

// TODO:advanced!!
router.post("/upload", upload.single("file"), controller.upload);

router.get("/custom/list", controller.custom);

module.exports = router;
