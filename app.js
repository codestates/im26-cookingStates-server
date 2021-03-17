const express = require("express");
const cors = require('cors');
const fs = require('fs');
const https = require('https');

const app = express();
const port = 4000;

app.use(
  cors({
    origin: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ response: "연결 성공!" });
});

let server;

console.log(fs.existsSync('/etc/letsencrypt/live/cookingstates.cf/'));

if (fs.existsSync('/etc/letsencrypt/live/cookingstates.cf/') && fs.existsSync('/etc/letsencrypt/live/cookingstates.cf/')) {
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/cookingstates.cf/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/cookingstates.cf/cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };
  server = https.createServer(credentials, app);
  server.listen(port, () => console.log(`🚀 HTTPS Server is starting on ${port}`));
} else {
  server = app.listen(port);
  console.log(`🚀 HTTP Server is starting on ${port}`);
}
module.exports = server;




