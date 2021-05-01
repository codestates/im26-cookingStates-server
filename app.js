const express = require("express");
const cors = require("cors");
const fs = require("fs");
const https = require("https");
const cookieParser = require("cookie-parser");
const mongo = require("./db/mongo");

const indexRouter = require("./routes/index.js");
const userRouter = require("./routes/user.js");
const recipeRouter = require("./routes/recipe.js");
const courseRouter = require("./routes/course.js");
const tokenRouter = require("./routes/token.js");
const oauthRouter = require("./routes/oauth.js");

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/recipe", recipeRouter);
app.use("/course", courseRouter);
app.use("/token", tokenRouter);
app.use("/oauth", oauthRouter);

if (
  fs.existsSync("/etc/letsencrypt/live/cookingstates.site/") &&
  fs.existsSync("/etc/letsencrypt/live/cookingstates.site/")
) {
  const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/cookingstates.site/privkey.pem",
    "utf8"
  );
  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/cookingstates.site/cert.pem",
    "utf8"
  );

  const credentials = { key: privateKey, cert: certificate };
  server = https.createServer(credentials, app);
  server.listen(port, () =>
    console.log(`🚀 HTTPS Server is starting on ${port}`)
  );
} else {
  server = app.listen(port);
  console.log(`🚀 HTTP Server is starting on ${port}`);
}
module.exports = server;
