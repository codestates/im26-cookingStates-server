const express = require("express");

const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.status(200).json({ response: "연결 성공!" });
});

module.exports = app.listen(port, () => {
  console.log(`🚀 Server is starting on ${port}`);
});
