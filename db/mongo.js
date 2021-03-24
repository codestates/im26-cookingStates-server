const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Schema = mongoose.Schema;
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
    // console.log("ok!");
  })
  .catch((e) => {
    console.log("error!!! ", e);
  });

const ProductSchema = new Schema({
  id: Number,
  title: String,
  ingredient: String,
  nutrient: {
    eng: String,
    car: String,
    pro: String,
    fat: String,
    na: String,
  },
  courseId: Number,
  difficulty: Number,
  way: String,
  type: String,
  image: {
    small: String,
    large: String,
  },
  manual: [[String, String]],
});

const CustomProductSchema = new Schema({
  id: String,
  title: String,
  difficulty: Number,
  type: String,
  image: String,
  manual: String,
  email: String,
  author: String,
});

RecipeModel = mongoose.model("RecipeModel", ProductSchema);
CustomRecipeModel = mongoose.model("CustomRecipeModel", CustomProductSchema);

module.exports = {
  mongoose,
  RecipeModel,
  CustomRecipeModel,
};
