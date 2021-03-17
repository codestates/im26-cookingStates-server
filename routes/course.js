const express = require("express");
const router = express.Router();

// /course/???

router.get("/", function (req, res, next) {
  // 모든 코스에 대한 정보를 보낸다
  res.status(200).send("모든 코스 정보 갯");
});

router.get("/:id", function (req, res, next) {
  // 해당 코스에 대한 정보를 보낸다
  // 1 : 한식
  // 2 : 중식
  // 3 : 비건
  // 4 : 디저트
  // 5 : 혼술 안주
  res.status(200).send("특정 코스 정보 갯");
});

module.exports = router;
