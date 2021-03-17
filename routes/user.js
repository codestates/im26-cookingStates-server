const express = require("express");
const router = express.Router();

// login  // post
router.post("/login", function (req, res) {
  res.status(200).send("로그인 성공");
});

// logout  // get
router.get("/logout", function (req, res) {
  res.status(200).send("로그아웃 성공");
});

// register  // post
router.post("/register", function (req, res) {
  res.status(200).send("가입 성공");
});

// :id/info  // get
router.get("/:id/info", function (req, res) {
  res.status(200).send("마이페이지 성공");
});

// :id/update  // post
router.post("/:id/update", function (req, res) {
  res.status(200).send("회원정보수정 성공");
});

// :id/unregister  // post
router.post("/:id/unregister", function (req, res) {
  res.status(200).send("회원탈퇴 성공");
});

module.exports = router;
