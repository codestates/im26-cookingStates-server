const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Schema = mongoose.Schema;
dotenv.config();

const URL = `mongodb+srv://${process.env.DATABASE_MONGODB_USER}:${process.env.DATABASE_MONGODB_PASSWORD}@cookingstates.s8upz.mongodb.net/cookingstates?retryWrites=true&w=majority`;
const databaseName = 'recipes';
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
    console.log('error!!! ', e);
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

RecipeModel = mongoose.model('RecipeModel', ProductSchema);

module.exports = {
  mongoose,
  RecipeModel,
};
