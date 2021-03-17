const express = require("express");

const indexRouter = require("./routes/index.js");
const userRouter = require("./routes/user.js");
const recipeRouter = require("./routes/recipe.js");
const courseRouter = require("./routes/course.js");

const app = express();
const port = 4000;

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/recipe", recipeRouter);
app.use("/course", courseRouter);

module.exports = app.listen(port, () => {
  console.log(`🚀 Server is starting on ${port}`);
});
