const express = require("express");
const router = express.Router();

// /recipe/???

router.get("/", function (req, res, next) {
  // 모든 레시피에 대한 정보를 보낸다
  res.status(200).send("모든 레시피 정보 겟");
});

router.get("/:id", function (req, res, next) {
  // 해당 id 값의 레시피에 대한 정보를 보낸다
  res.status(200).send("특정 레시피 정보 갯");
});

// TODO:advanced!!
router.post("/", function (req, res, next) {
  // 새로운 레시피를 등록할 때 쓰는 라우팅
  res.status(200).send("레시피 등록 성공");
});

module.exports = router;
