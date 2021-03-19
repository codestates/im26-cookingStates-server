const express = require("express");
const router = express.Router();
const controller = require("../controllers/recipe");

router.get("/", controller.info);

router.get("/:id", controller.specificInfo);

router.post("/:id/checked", controller.checkedRecipe);

// TODO:advanced!!
router.post("/", controller.upload);

module.exports = router;
