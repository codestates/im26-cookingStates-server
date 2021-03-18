const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const URL = `mongodb+srv://${process.env.DATABASE_MONGODB_USER}:${process.env.DATABASE_MONGODB_PASSWORD}@cookingstates.s8upz.mongodb.net/cookingstates?retryWrites=true&w=majority`;
const databaseName = "recipes";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: databaseName,
};

mongoose
  .connect(URL, options)
  .then(() => {
    console.log("ok!");
  })
  .catch((e) => {
    console.log("error!!! ", e);
  });

module.exports = mongoose;
